// Packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);

const app = express()

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.db', dir: './server/var/db' })
}));
app.use(passport.authenticate('session'));

// Routes
const auth = require('./routes/auth');
app.use('/auth', auth);
const posts = require('./routes/api/posts');
app.use('/api', posts);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
