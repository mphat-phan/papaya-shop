import express from 'express'
import passport from 'passport';
import session  from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

const authGoogle = express();

authGoogle.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

authGoogle.use(passport.initialize());
authGoogle.use(passport.session());
authGoogle.get('/auth/google',
  passport.authenticate('google', {scope: ['email', 'profile']})
)
authGoogle.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protect',
    failureRedirect: '/login'
  })
)

export default authGoogle;