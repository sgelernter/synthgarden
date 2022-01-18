const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

mongoose 
.connect(db, { useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB successfully'))
.catch(err => console.log(err));

const port = process.env.PORT || 5000;




app.get('/', (req, res) => {
    res.send('SynthGarden');
});

app.use('/api/users/', users);

app.listen(port, () => {console.log(`listening on port ${port}`)});  