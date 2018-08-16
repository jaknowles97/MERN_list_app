const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

app.use(express.json());

const db = require('./config/keys.js').mongoURI;

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err));

app.use('/api/items', items);

// Serve statitic assets if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (requestAnimationFrame, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    }); 
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));