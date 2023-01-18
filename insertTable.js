const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Tkaektnwhdk13@%^',
    database : 'jenga'
});

db.connect();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './src/views');
app.set('view engine', 'pug')

app.get('/enterQuestion', (req, res) => {
    console.log('entered');
    res.render('processQuestion')
});

app.post('/questionProcess', (req, res) => {
    var post = req.body;
    var question = post.question;

    db.query(`INSERT INTO questions (question) VALUES(?)`, [question], (err, result) => {
        if (err) {
            throw err;
        }
        res.redirect('/enterQuestion');
        res.end();
    });
});

app.listen(3000, () => {
    console.log('app listening on port 3000!');
});

