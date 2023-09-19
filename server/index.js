const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')));
    
    // var router = express.Router();
    // router.get('/', function(req, res, next) {
        // res.sendFile(__dirname + '/public/index.html');
        // res.render(__dirname + './public/index');
    // });
    app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
    // module.exports = router;
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Sever started on port ${port}`));
