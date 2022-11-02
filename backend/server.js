<<<<<<< HEAD
import express from "express"; // Sử dụng framework express
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import api from "./routes/index.js";
import cors from "cors";

dotenv.config();

//Port
const PORT = process.env.PORT || 3000; // Port để chạy app Nextjs, cũng là server nodejs

//app
const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

//Connect database
connectDB();

//API routes
app.use("/api", api);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on ${process.env.PORT}`);
});
=======
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import receiptRoutes from './routes/receiptRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/receipt', receiptRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);
>>>>>>> master
