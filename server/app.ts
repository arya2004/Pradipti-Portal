import express from 'express';
import userRoutes from './routes/userRoutes';
import router from './routes/authenticate';

const app = express();
app.use(express.json());
app.use('/api', userRoutes);
app.use('/', router)

export default app;
