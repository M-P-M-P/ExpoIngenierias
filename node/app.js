import config from './config.js'
import cron from "node-cron"
import express  from "express"
import cors from 'cors'
import session from 'express-session'
import SequelizeStore from 'connect-session-sequelize'

//importamos la conexión a la DB
import db from "./database/db.js"

//importamos nuestro enrutador

//hay que importar las rutas de admin
import UserRoutes from './routes/UserRoutes.js';
import CategoryRoutes from './routes/CategoryRoutes.js'
import studentRoutes from './routes/StudentRoutes.js'
import projectRoutes from './routes/ProjectRoutes.js'
import AnnounRoutes from './routes/AnnounRoutes.js'
import AdminRoutes from "./routes/AdminRoutes.js"
//rutas de edicion
import EditionRoutes from "./routes/EditionRoutes.js"

// las rutas de juez
import criteriaRoutes from './routes/criteriaRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import areasRoutes from './routes/areasRoutes.js';
import criteriaJudgesRoutes from './routes/criteriaJudgesRoutes.js'; 
import commentRoutes from './routes/commentRoutes.js';
import judgeProjectRoutes from './routes/judgeProjectRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import personRoutes from './routes/personRoutes.js';
import teamsRoutes from './routes/teamRoutes.js';
import teamMemberRoutes from './routes/teamMemberRoutes.js';

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Adimn Routes
app.use('/users', UserRoutes);
app.use('/categories', CategoryRoutes);

// Judge Routes
app.use('/projects', projectRoutes);
app.use('/students', studentRoutes);
app.use('/announ', AnnounRoutes);
app.use('/Admin',  AdminRoutes);
app.use('/Ediciones',EditionRoutes);
// app.use('/projects', projectRoutes);
// app.use('/students', studentRoutes);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', criteriaRoutes);
app.use('/api', projectRoutes);
app.use('/api', categoryRoutes);
app.use('/api', areasRoutes);
app.use('/api', criteriaJudgesRoutes);
app.use('/api', commentRoutes); 
app.use('/api', judgeProjectRoutes); 
app.use('/api', studentRoutes);
app.use('/api', personRoutes);
app.use('/api', teamsRoutes);
app.use('/api', teamMemberRoutes);

//console.log(process.env.DB_CONNECTION_STRING)

try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}


const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({db:db})


app.listen(8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
})
