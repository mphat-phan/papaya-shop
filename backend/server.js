import express from 'express' // Sử dụng framework express
import next from 'next' // Include module next
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import api from './routes/index.js';
import './config/passport.js';
import authGoogle from './config/authGoogle.js';
import authFacebook from './config/authFacebook.js';
import {isLogged} from './middlewares/AuthMiddleware.js';

dotenv.config();
const port = process.env.PORT || 3000 // Port để chạy app Nextjs, cũng là server nodejs
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

connectDB();

app.prepare().then(() => {
  
  //Server 
  const server = express();
  server.use(express.json());
  server.use(authGoogle); //Set up authentication with GG
  server.use(authFacebook);
  
  //Client Routes
  server.get('/login', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a></br><a href="/auth/facebook">Login with Facebook</a>');

  })

  server.get('/protect', isLogged, (req, res) => {
    res.send(req.user);
  })

  server.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });

  //API routes
  server.use('/api', api);

  //Liên kết đến các routes NextJS
  server.all('*', (req, res) => {
    return handle(req, res)
  })
  
  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on ${process.env.DOMAIN_NAME}:${port}`)
  })
})
