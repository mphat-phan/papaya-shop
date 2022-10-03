// import passport from 'passport';
// import { Strategy as OAuth2Strategy } from 'passport-google-oauth2';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import dotenv from 'dotenv';
// dotenv.config();

// // Gmail
// passport.use(new OAuth2Strategy({
//     // authorizationURL: 'http://localhost:3000/oauth2/authorize',
//     // tokenURL: 'http://localhost:3000/oauth2/token',
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: `${process.env.DOMAIN_NAME}/google/callback`
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // User.findOrCreate({ exampleId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//     return done(null, profile);
//   }
// ));

// //Facebook
// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_APP_ID,
//   clientSecret: process.env.FACEBOOK_APP_SECRET,
//   callbackURL: `${process.env.DOMAIN_NAME}/auth/facebook/callback`
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//     return done(null, profile);
//   }
// ));

// passport.serializeUser( (user, done) => {
//   done(null, user);
// })

// passport.deserializeUser( (user, done) => {
//   done(null, user);
// })
