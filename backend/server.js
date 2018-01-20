const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tasklist');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//create database
db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS tasks (task TEXT, isdone INTEGER)");
});

//handle with error(no 'Access-Control-Allow-Origin') 
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//insert values from input to database
app.post('/tasks', function (req, res) {

    var stmt = db.prepare('INSERT INTO tasks VALUES (?,?)');
    if (req.body.task != "") {
        stmt.run(req.body.task, req.body.isdone);
        stmt.finalize();
    }
    else {
        console.log('empty field')
    }

    db.each('SELECT * FROM tasks', function (err, row) {

        if (err) {
            console.log("Failed to insert.");
        }

        else {
            res.end();
        }

    });

});

//create json
app.get('/tasks', function (req, res) {
    db.all("SELECT * FROM tasks", function (err, rows) {
        res.json(rows);
        res.end()
    });
});
//delete from database
app.post('/delete', function (req, res) {
    var stmt = db.prepare(`DELETE FROM tasks WHERE task=?`);
    stmt.run(req.body.delete);
    stmt.finalize();
});
//update when checked
app.post('/update1', function (req, res) {
    var stmt = db.prepare(`UPDATE tasks SET isdone = 1 WHERE task=?`);
    stmt.run(req.body.update);
    stmt.finalize();
});
//update when uchecked
app.post('/update2', function (req, res) {
    var stmt = db.prepare(`UPDATE tasks SET isdone = 0 WHERE task=?`);
    stmt.run(req.body.update);
    stmt.finalize();
});

app.listen(3000);

console.log("http://localhost:3000/tasks");

