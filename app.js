const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const samples = require('./routes/api/samples');
const patches = require('./routes/api/patches');

app.use(bodyParser.urlencoded({ extended: false, limit: '10mb'}));
app.use(bodyParser.json({ limit: '10mb'}));
app.use(passport.initialize());
require('./config/passport')(passport);

// app.use(bodyParser({limit: '10mb'}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}

mongoose 
.connect(db, { useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB successfully'))
.catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('SynthGarden');
});

app.use('/api/users/', users);
app.use('/api/samples/', samples);
app.use('/api/patches/', patches);


app.listen(port, () => {console.log(`listening on port ${port}`)});  