import config from './config.js'
import cron from "node-cron"
import express  from "express"
import cors from 'cors'
import session from 'express-session'
import SequelizeStore from 'connect-session-sequelize'
//importamos la conexión a la DB
import db from "./database/db.js"
//importamos nuestro enrutador
import studentRoutes from './routes/StudentRoutes.js'
import projectRoutes from './routes/ProjectRoutes.js'
import AnnounRoutes from './routes/AnnounRoutes.js'
import AdminRoutes from "./routes/AdminRoutes.js"
//hay que importar las rutas de admin
// las rutas de juez


const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/projects', projectRoutes);
app.use('/students', studentRoutes);
app.use('/announ', AnnounRoutes);
app.use('/Admin',  AdminRoutes);
// app.use('/projects', projectRoutes);
// app.use('/students', studentRoutes);


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