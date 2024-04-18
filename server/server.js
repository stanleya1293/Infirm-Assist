const express = require('express')
const server = express()
const port = 3000

let indexPath = require('path');
let mysql = require('mysql2');
const { Console } = require('console');

let db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root', //change this if it is different
    password: 'Awesomearden1234', //change this to password
    database: 'Infirmassist' 
});


server.use(express.static(__dirname + "/../client/build"));

server.use(express.json());
server.use(express.urlencoded());

server.get('/', (req, res) => {
    //res.sendFile(indexPath.resolve(__dirname + '/../client/build/index.html'))
});

server.get('/PatientDirectory', (req, res) => {
    //res.sendFile(indexPath.resolve(__dirname + '/../client/build/index.html'))
});


server.post('/PatientSubmit', (req, res) => {
    let data = req.body;
    db.connect((err) => {
        if (err) throw err;
        db.query(`INSERT INTO PATIENT (Fname, Lname, ssn, doa, dob) VALUES ('${data.firstName}', '${data.lastName}', '${data.ssn}', '${data.doa}', '${data.dob}')`, (err) => {
            if (err) throw err;
        });
    });
    /*db.connect((err) => {
        if (err) throw err;
        db.query('SELECT * FROM PATIENT', (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    }); */
});

server.get('/PatientLoad', (req, res) => {
    /*db.connect((err) => {
        if (err) throw errorMonitor;
        db.query(`DELETE FROM PATIENT`)
        console.log("DELETED!!!!")
    }) */
    db.connect((err) => {
        if (err) throw err;
        db.query(`SELECT * FROM PATIENT`, (err, results) => {
            console.log(results)
            res.json(results)
        })
    })
})

server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});