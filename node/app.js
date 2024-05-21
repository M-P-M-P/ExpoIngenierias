import express from 'express';
import cors from 'cors';

import criteriaRoutes from './routes/criteriaRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import areasRoutes from './routes/areasRoutes.js';
import criteriaJudgesRoutes from './routes/criteriaJudgesRoutes.js'; 
import commentRoutes from './routes/commentRoutes.js';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', criteriaRoutes);
app.use('/api', projectRoutes);
app.use('/api', categoryRoutes);
app.use('/api', areasRoutes);
app.use('/api', criteriaJudgesRoutes);
app.use('/api', commentRoutes); 

app.listen(8000, () => {
    console.log('Server UP running in http://localhost:8000/');
});
