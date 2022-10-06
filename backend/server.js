import express from 'express' // Sử dụng framework express
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import api from './routes/index.js';
import cors from "cors";

dotenv.config();

//Port
const PORT = process.env.PORT || 3000 // Port để chạy app Nextjs, cũng là server nodejs

//app 
const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(cors({ origin: `${process.env.CLIENT_URL}`}));
    app.get('/', (req, res) => {
        res.send('API is running');
    });
}

//Connect database
connectDB();

//API routes
app.use('/api', api);

app.listen(PORT, err => {
  if (err) throw err
  console.log(`> Ready on ${process.env.PORT}`)
})
