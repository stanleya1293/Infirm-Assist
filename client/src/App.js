import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'


const Button = (props) => {
  return (
    <form action={props.redirect}>
      <button type='submit'><span className="spoon"></span>{props.text}</button>
    </form>
  )
}

const FieldEntry = (props) => {
  let Fields = [];
  for (let i = 0; i < props.fields.length; i++) {
    Fields.push(
    <>
      <h3 className="inputDescription">{props.text[i]}</h3>
      <input type='text' name={props.fields[i]}></input>
    </>
    )
  }
  return (
    <form className="inputField" action='/' method="post">
      {Fields}
      <Button text = "Submit"/>
    </form>
  )
}

const NavBar = () => {
  return (
    <div className="navbar">
      <h1 className="companyTitle">InfirmAssist</h1>
      <p>Receptionist and Hospital Administration Software</p>
    </div>
  )
}

const PatientItem = (props) => {
  return (
    <div className="patientItem">
      <h3>{props.items}</h3>
      <p>{props.items}</p>
      <p>{props.items}</p>
    </div>
  )
}

const PatientList = (props) => {
  let ItemList = [];
  for (let i = 0; i < props.items.length; i++) {
    ItemList.push(<PatientItem items = {props.items}/>);
  }
  return (
    <div className="patientList">
      {ItemList}
    </div>
  )
}


function WelcomePage() {
  return (
    <body>
      <NavBar />
      <div className="content">
        <h2 className="infoText">WELCOME</h2>
        <p>CLICK ANYWHERE BELOW TO GET STARTED</p>
        <Button text = "Patient Entry" redirect = "/PatientEntry"/>
        <Button text = "Patient Directory" redirect = "/PatientDirectory"/>
      </div>
    </body>
  );
}

function PatientEntryPage() {
  const Fields = [
    "Fname",
    "Lname",
    "SSN",
    "DOA",
    "DOB"
  ]
  const Text = [
    "First Name",
    "Last Name",
    "Social Security Number",
    "Date of Admittance",
    "Date of Birth"
  ]
  return (
    <body>
      <h1 className="companyTitle">InfirmAssist</h1>
      <h2 className="infoText">Patient Entry</h2>
      <span>
        <FieldEntry fields = {Fields} text = {Text}/>
      </span>
    </body>
  );
}

function PatientDirectoryPage(){
  //let data = fetch("/patientData").then((res) => {return res.json()});
return(
  <body>
    <div className="container">
      <h2 className="infoText">Patient Directory</h2>
      <input type="text" placeholder="Search patients..." className="searchInput"></input>
      <PatientList items = {[]}/>
    </div>
  </body>
);
}



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/PatientEntry' element={<PatientEntryPage/>} />
        <Route path='/PatientDirectory' element={<PatientDirectoryPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
