import express from 'express';
import morgan from 'morgan';

const app = express();

//Import routes
import userRoutes from './routes/users.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import authRoutes from './routes/auth.routes.js';
import { authenticateToken } from './middlewares/authenticate.middleware.js';

//Middleware
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/users/', userRoutes);
//Proteger routes de manera global
app.use('/api/tasks/', authenticateToken, taskRoutes);
app.use('/api/login/', authRoutes);

export default app;
