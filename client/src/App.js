import './App.css';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'


const Button = (props) => {
  const navigate = useNavigate();
  return (
    <form>
      <button onClick = {() => navigate(props.redirect)}><span className="spoon"></span>{props.text}</button>
    </form>
  )
}

const FieldEntry = (props) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [ssn, setSsn] = useState('');
  const [doa, setDoa] = useState('');
  const [dob, setDob] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const Patient = {firstName, lastName, ssn, dob, doa};
    fetch('http://localhost:3000/PatientSubmit', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(Patient)
    })
  }
  return (
    <form className="inputField" onSubmit = {handleSubmit}>
      <h3 className="inputDescription">First Name</h3>
      <input type='text' required value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>

      <h3 className="inputDescription">Last Name</h3>
      <input type='text' required value={lastName} onChange={(e) => setLastName(e.target.value)}></input>

      <h3 className="inputDescription">SSN</h3>
      <input type='text' required value={ssn} onChange={(e) => setSsn(e.target.value)}></input>

      <h3 className="inputDescription">Date of Birth</h3>
      <input type='text' required value={dob} onChange={(e) => setDob(e.target.value)}></input>

      <h3 className="inputDescription">Date of Admittance</h3>
      <input type='text' required value={doa} onChange={(e) => setDoa(e.target.value)}></input>

      <button type="submit"><span className="spoon"></span>Submit</button>
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



const PatientList = ({patients}) => {
  return (
    <div className="patientList">
      {patients.map((patient) => { 
      return(
      <div className="patientItem" key={patient.id}>
        <h3>Name: {patient.Fname} {patient.Lname}</h3>
        <p>SSN: {patient.ssn}</p>
        <p>Date of Admittance: {patient.doa}</p>
        <p>Date of Birth: {patient.dob}</p>
      </div>
      )
      })
      }
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
        <Button text = "Room Assignment" redirect = "/RoomPage"/>
      </div>
    </body>
  );
}

function PatientEntryPage() {
  const navigate = useNavigate();
  const NavigateToHome = () => {
    navigate('/Home');
  };
  return (
    <body>
      <h1 className="companyTitle" onClick={NavigateToHome}>InfirmAssist</h1>
      <h2 className="infoText">Patient Entry</h2>
      <span>
        <FieldEntry/>
      </span>
    </body>
  );
}

function PatientDirectoryPage(){
  const navigate = useNavigate();
  const NavigateToHome = () => {
    navigate('/Home');
  };
const [patients, setPatients] = useState(null);
useEffect(() => {
  fetch('http://localhost:3000/PatientLoad').then((res) => {
    return res.json()
  }).then((data) => {
    setPatients(data);
  })
}, [])

return(
  <body>
    <h1 className="companyTitle" onClick={NavigateToHome}>InfirmAssist</h1>
    <div className="container">
      <h2 className="infoText">Patient Directory</h2>
      <input type="text" placeholder="Search patients..." className="searchInput"></input>
      {patients && <PatientList patients = {patients}/>}
    </div>
  </body>
);
}

function LoginForm(){
  const navigate = useNavigate();
  const NavigateToLogin = () => {
    navigate('/RegisterPage');
  }
  return (
    <div className="wrapper">
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <i className='bx bxs-user'></i>
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <i className='bx bxs-lock-alt'></i>
        </div>
        <div className="remember-forgot">
          <label><input type="checkbox" />Remember Me</label>
          <a href="#">Forgot Password</a>
        </div>
        <form>
          <button type='submit' onClick = {() => navigate('/Home')}><span className="spoon"></span>Login</button>
        </form>
        <div className="register-link">
          <p>Don't have an account? <a href="#" onClick={NavigateToLogin}>Register</a></p>
        </div>
      </form>
    </div>
  );
}

function RegisterForm(){
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <form action="">
        <h1>Register</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <i className='bx bxs-user'></i>
        </div>
        <div className="input-box">
          <input type="email" placeholder="Email" required />
          <i className='bx bxs-lock-alt'></i>
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <i className='bx bxs-lock-alt'></i>
        </div>
        <form>
          <button type='submit' onClick = {() => navigate('/')}><span className="spoon"></span>Register</button>
        </form>
      </form>
    </div>
  );
}

const RoomPage = () => {
  const navigate = useNavigate();
  const NavigateToHome = () => {
    navigate('/Home');
  };
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    fetch('http://localhost:3000/rooms')
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      })
  };

  const handleAddRoom = () => {
    navigate('/AddRoom');
  };
  let status = ""
  if (rooms.Status) {
    status = "Occupied"
  }
  else {
    status = "Unoccupied"
  }

  return (
    <div className="Room">
      <h1 className="companyTitle" onClick={NavigateToHome}>InfirmAssist</h1>
      <h2>Rooms</h2>
      <button onClick={handleAddRoom}><span className="spoon"></span>Add Room</button>
      <div className="roomList">
        {rooms.map((room) => (
          <div className="roomItem" key={room.id}>
            <h3>Room Number: {room.number}</h3>
            <p>Status: {status}</p>
            <p>Operation: {room.Operation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AddRoomPage = () => {
  const navigate = useNavigate();
  const [roomNumber, setRoomNumber] = useState('');
  const [roomOp, setRoomOp] = useState('');
  const rooms = {
    number: roomNumber,
    Status: 0,
    Operation: roomOp
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/RoomSubmit', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(rooms)
    })
    navigate('/RoomPage');
  };

  return (
    <div className="AddRoomPage">
      <h2>Add Room</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Room Number:
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
          />
        </label> 
        <label>
          Operation:
          <select onChange={(e) => setRoomOp(e.target.value)}>
            <option value="Cardiology">Cardiology</option> 
            <option value="Neurology">Neurology</option> 
            <option value="Pediatric">Pediatric</option> 
            <option value="Oncology">Oncology</option> 
            <option value="Trauma">Trauma</option> 
            <option value="General">General</option> 
            <option value="Urology">Urology</option> 
            <option value="Gynecology">Gynecology</option>    
            <option value="Gastroenterology">Gastroenterology</option>         
          </select>
        </label> 
        <button type="submit"><span className="spoon"></span>Add Room</button>
      </form>
    </div>
  );
};


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/Home' element={<WelcomePage/>}/>
        <Route path='/PatientEntry' element={<PatientEntryPage/>} />
        <Route path='/PatientDirectory' element={<PatientDirectoryPage/>} />
        <Route path='/RegisterPage' element={<RegisterForm/>} />
        <Route path='/RoomPage' element={<RoomPage/>} />
        <Route path="/AddRoom" element={<AddRoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
