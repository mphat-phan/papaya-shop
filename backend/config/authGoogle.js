import express from 'express'
import passport from 'passport';
import session  from 'express-session';
import dotenv from 'dotenv';
import MemoryStore from 'memorystore';
dotenv.config();

const authGoogle = express();
authGoogle.set('trust proxy', 1);
authGoogle.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
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