import express from 'express';
import cors from 'cors';
import criteriaRoutes from './routes/criteriaRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usa el enrutador de criterias
app.use('/api', criteriaRoutes);
app.use('/api', projectRoutes);
app.listen(8000, () => {
    console.log('Server UP running in http://localhost:8000/');
});
