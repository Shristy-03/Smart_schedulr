import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import app from './server.js';

const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: "http://localhost:5173",  // your frontend
  credentials: true
}));


app.listen(PORT, () => {
  console.log(`Schedulr backend listening on port ${PORT}`);
});