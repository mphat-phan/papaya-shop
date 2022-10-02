import express from 'express'
import passport from 'passport';
import session  from 'express-session';
import dotenv from 'dotenv';
import MemoryStore from 'memorystore';
dotenv.config();

const authFacebook = express();

authFacebook.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
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