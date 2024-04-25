const express = require('express')
const server = express()
const port = 3000

let mysql = require('mysql2');

let db = mysql.createConnection({
    host: '',
    port: '3306',
    user: 'root', //change this if it is different
    password: 'Awesomearden1234', //change this to password
    database: 'Infirmassist' 
});


server.use(express.static(__dirname + "/../client/build"));

server.use(express.json());
server.use(express.urlencoded());

server.get('/', (req, res) => {});

server.get('/PatientDirectory', (req, res) => {});
server.get('AddRoomPage', (req, res) => {});
server.get('/RoomPage', (req, res) => {});


server.post('/PatientSubmit', (req, res) => {
    let data = req.body;
    let roomNumber = 0;    
    db.connect((err) => {
        if (err) throw err;
        db.query(`SELECT number FROM ROOMS WHERE (Operation = "${data.operation}")`, (err, results) => {
            if (err) throw err;
            roomNumber = results[0].number
            db.query(`INSERT INTO PATIENT (Fname, Lname, ssn, doa, dob, RoomN) VALUES ('${data.firstName}', '${data.lastName}', '${data.ssn}', '${data.doa}', '${data.dob}', '${roomNumber}')`, (err) => {
                if (err) throw err;
            });
            db.query(`UPDATE ROOMS SET Status = 1 WHERE (number = ${roomNumber})`, (err) => {
                if (err) throw err;
            });
        })
    });
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
            res.json(results)
        })
    })
})

server.post('/RoomSubmit', (req, res) => {
    let data = req.body;
    db.connect((err) => {
        if (err) throw err;
        db.query(`INSERT INTO ROOMS (number, Status, Operation) VALUES (${data.number}, ${data.Status}, '${data.Operation}')`, (err) => {
            if (err) throw err;
        })
    })
})

server.get('/rooms', (req, res) => {
    db.connect((err) => {
        if (err) throw err;
        db.query(`SELECT * FROM ROOMS`, (err, results) => {
            res.json(results);
        })
    })
})

server.post('/RoomDelete', (req, res) => {
    let rnum = req.body.roomnum
    db.connect((err) => {
        if (err) throw err;
        db.query(`DELETE FROM ROOMS WHERE (number = ${rnum})`)
    })
})

server.post('/PatientDelete', (req, res) => {
    let pssn = req.body.ssn
    db.connect((err) => {
        if (err) throw err;
        db.query(`DELETE FROM PATIENT WHERE (ssn = ${pssn})`)
    })
})

server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});