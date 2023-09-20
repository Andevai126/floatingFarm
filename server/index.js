const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express()
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

// if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
    

    // app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
    //app.get('/', (req, res) => {res.send('heyyy');});
// }

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Sever started on port ${port}`));
