const express = require('express');
const bodyParser = require('body-parser');
const app = require('express')();
const PORT = 80;
const mysql = require("mysql");
var cors = require('cors')

app.use(cors());
app.use( express.json() );
app.use(bodyParser.urlencoded({extended: true}));
app.listen(PORT);
//DBConnection manager
const con = mysql.createConnection({
    host: "database-1.cnpuqcfam1ux.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "password",
    database: "Grades"    
  })
  con.connect(function(err) {
	if (err) throw err}
);

/* API Requests */ 
    //Put Request
    app.put('/create', (req, res) => { 
        const  StudentID  = req.body.id;
        const  Grade  = req.body.grade;        
        sql = "INSERT INTO Grades (StudentID, Grade) VALUES ('" + StudentID + "', " + Grade + ");";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });
        res.send("Insert finished");
    })

    //Get Request
    app.get('/read', (req, res) => {
    const selectAll =
    "SELECT * FROM Grades;"
    con.query(selectAll,(err,result)=> {
        console.log("Querying for all");
        res.send(result);
    });
    })
    //Post Request
    app.post('/update', (req, res) => { 
        const  StudentID  = req.body.id;
        const  NewGrade  = req.body.grade;
        sql = "UPDATE Grades SET Grade ='" + NewGrade + "'WHERE StudentID='" + StudentID +"';";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 Record Updated");
        });  
        res.send("Update finished")  
    })
    //Delete Request
    app.delete('/delete', (req, res) => {
        const  StudentID  = req.body.id;
        sql = "DELETE FROM Grades WHERE StudentID='"+ StudentID+"';";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 Record Deleted");
        });        
        res.send("Delete finished"); 
    })

