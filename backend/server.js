import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import leaveRoutes from './routes/leaveRoutes.js';

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api', leaveRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
