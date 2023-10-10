var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('../../db');

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.getConn().query('SELECT * FROM users WHERE username = ?', [ username ], function (err, results) {
    if (err) { return cb(err); }
    if (results.length === 0) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    const row = results[0];
    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, row);
    });
  });
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

const router = express.Router();

// router.get('/login', function(req, res, next) {
//   res.render('login');
// });

// router.post('/login/password', passport.authenticate('local', {
//   successReturnToOrRedirect: '/',
//   failureRedirect: '/',
//   failureMessage: true
// }));

router.post('/login/password', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }
    if (!user) {
      return res.status(401).json({ success: false });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false });
      }
      return res.json({ success: true });
    });
  })(req, res, next);
});

// router.post('/logout', function(req, res, next) {
//   req.logout(function(err) {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
// });

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false });
    }
    return res.json({ success: false });
  });
});

// router.get('/signup', function(req, res, next) {
//   res.render('signup');
// });

router.post('/signup', function (req, res, next) {
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
    if (err) { return next(err); }

    db.getConn().query('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
      req.body.username,
      hashedPassword,
      salt
    ], function (err, results) {
      if (err) { return next(err); }

      console.log(results); //--------------------------------------

      var user = {
        id: results.insertId,
        username: req.body.username
      };

      req.login(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    });
  });
});

module.exports = router;