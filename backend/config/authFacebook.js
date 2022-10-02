import express from 'express'
import passport from 'passport';
import session  from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

const authFacebook = express();

authFacebook.use(session({
    cookie: {
      secure: true,
      maxAge:60000
    },
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

authFacebook.use(passport.initialize());
authFacebook.use(passport.session());
authFacebook.get('/auth/facebook',
  passport.authenticate('facebook', {scope:'email'})
);

authFacebook.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/protect');
});
export default authFacebook;