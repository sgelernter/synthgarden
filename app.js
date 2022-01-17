const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

mongoose 
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.log(err));

const users = require('./routes/api/users');


app.get('/', (req, res) => {
    res.send('SynthGarden');
});

const port = process.env.PORT || 5000;

app.use('/api/users/', users);

app.listen(port, () => {console.log(`listening on port ${port}`)});  