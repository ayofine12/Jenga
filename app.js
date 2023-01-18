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
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'pug')

app.get('/enterNumber', (req, res) => {
    console.log('entered');
    res.render('getNumber')
});

app.post('/numberProcess', (req, res) => {
    var post = req.body;
    var number = Number(post.number);
    if (isNaN(number)) {
        res.render('wrongPage');
    } else {
        db.query(`SELECT * FROM questions WHERE id=?`, [number], (error, question) => {
            if (error) {
                throw error;
            }
            if (question[0] === undefined) {
                res.render('wrongPage');
            } else {
                res.render('question', 
                {
                    remainder: question[0].id % 3,
                    question: question[0].question
                });
            }
        });
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('app listening on port 3000!');
});