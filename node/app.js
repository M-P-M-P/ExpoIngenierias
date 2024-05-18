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
// las rutas de juez
import main from './middleware/authConfig.js'




const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
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


app.use(session({
    secret: '35a73657a3sd5436873as5d74368a57sd35a7sd357asd',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));



app.get('/', (req, res)=>{
    req.session.usuario = 'Juan Perez';
    req.session.rol = 'Admin';
    req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
    res.send(`El usuario <strong>${req.session.usuario}</strong> con rol <strong>${req.session.rol}</strong> ha visitado esta pagina 
    <strong>${req.session.visitas}</strong>
    `)
})


//cron.schedule('*/20 * * * * *', function() { console.log('Running a task every 20 seconds'); main();});




app.listen(8000, ()=>{
    console.log('Server UP running in http://localhost:8000/')
})