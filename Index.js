const express = require('express');
const bodyParser = require('body-parser');
const app = require('express')();
const PORT = 8080;
const mysql = require("mysql");
var cors = require('cors')

app.use(cors());
app.use( express.json() );
app.use(bodyParser.urlencoded({extended: true}));
app.listen(PORT);

const con = mysql.createConnection({
    host: "database-2.cnpuqcfam1ux.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "password",
    database: "Grades"
    
  })
  con.connect(function(err) {
	if (err) throw err}
);

function Insert(id, grade) {
        sql = "INSERT INTO Grades (StudentID, Grades) VALUES ('" + id + "', " + grade + ");";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
      });
  }
  
app.post('/insert', (req, res) => { 
        const  StudentID  = req.body.id;
        const  Grade  = req.body.grade;        
        Insert(StudentID, Grade);        
})

app.get('/get', (req, res) => {
    const selectAll =
    "SELECT * FROM Grades;"
    con.query(selectAll,(err,result)=> {
        console.log("Querying for all");
        res.send(result);
    });
})
app.get('/getavrg', (req, res) => {
    const selectAvrg =
    "SELECT round(AVG(Grades),2) AS Avrg FROM Grades;"
    con.query(selectAvrg,(err,result)=> {
        console.log("Querying for avrg");
        res.send(result);
    });
})