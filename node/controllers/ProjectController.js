//importamos el Modelo
import db from "../database/db.js"
import {ProjectModel,PersonModel, StudentModel, TeamModel, MaterialModel, MaterialProjectModel, CategoryModel, AreaModel} from "../models/Relations.js"
import { Sequelize } from 'sequelize';  // Import Sequelize

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.findAll()
        res.json(projects)
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Mostrar un proyecto
export const getProject = async (req, res) => {
    try {
        const project = await ProjectModel.findByPk(req.params.id, {
            include: [
                { model: AreaModel },
                { model: CategoryModel },
                { model: PersonModel },
                { model: StudentModel },
                {model: TeamModel,
                    include: [
                        {
                            model: StudentModel,
                            through: 'team_members'
                        }
                    ]
                }
                
            ]
        });

        // Verificar si se encontró el proyecto
        if (!project) {
            return res.status(404).json({ message: 'El proyecto no fue encontrado.' });
        }
        



        // Responder con el proyecto que incluye los nombres de la categoría y el área
        res.json(project);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        console.error('Error al obtener el proyecto:', error);
        res.status(500).json({ message: 'Hubo un error al obtener el proyecto.' });
    }
}


//Actualizar un proyecto
export const updateProject = async (req, res) => {
    try {
        await ProjectModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Eliminar un registro
export const deleteProject = async (req, res) => {
    try {
        await ProjectModel.destroy({ 
            where: { id : req.params.id }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}

//Registro 
async function registerProject (req, res){

    var id_profesorAsesor = 0;
    
    const { title, description, linkVideo, linkPoster, area, category, materials, members, teachers } = req.body;
    console.log(title + " " , description + " " + linkVideo + " " + linkPoster +  " " + area + " " + category + " " + materials);  

    var codigo = title.substring(0,5) + description.substring(0,5) + area + category;

    var contadorProfe = 0;
    // Para cada profesor, crear un objeto Person y guardarlo en la base de datos
    for (const teacher of teachers) {
    const person = await PersonModel.create({
        id: (codigo + contadorProfe + "T"),
        name: teacher.name,
        lastName: teacher.lastName,
        email: teacher.email
    }).then((person)=>{
        if (contadorProfe === 0){
            id_profesorAsesor = person.id;
        }
        contadorProfe++;
    });
    // Guardar la persona en la base de datos o realizar alguna acción necesaria
    }



    const project = await ProjectModel.create({
    title,
    description,
    linkVideo,
    linkPoster,
    statusGeneral: "en revision",
    statusPoster: "en revision",
    statusVideo: "en revision",
    id_edition: 1,
    id_area: area,
    id_category: category,
    id_responsable: id_profesorAsesor,
    id_lider: "auth0|66340f38cfd75a371a1b532b",
    });

    const projectId = project.id

        // Crear un nuevo proyecto con los datos recibidos

    // Guardar el proyecto en la base de datos
    const team = await TeamModel.create({
    name: title,
    id_leader: "auth0|66340f38cfd75a371a1b532b",
    id_project: projectId
    });

    // Para cada miembro, crear un objeto Student y guardarlo en la base de datos
    var contadorStudent = 0
    for (const member of members) {
    const student = await StudentModel.create({
        id: (codigo + contadorStudent + "S"),
        name: member.name,
        lastName: member.lastName,
        enrollment: member.enrollment
    })
    await team.addStudent(student);
    contadorStudent++;
    // Guardar el estudiante en la base de datos o realizar alguna acción necesaria
    }



    for (const material of materials) {
        await MaterialProjectModel.create({
            id_project: projectId,
            id_material: material.id_material,
            amount: material.amount
        });
    }

      // Responder al cliente con un mensaje de éxito o cualquier otro dato necesario
    res.json({ message: 'Datos guardados exitosamente.' });
}

async function formProject() {
    const categories = await CategoryModel.findAll();
    const areas = await AreaModel.findAll();
    return {
        categories: categories,
        areas: areas
    };
}

export const handleRegister = async(req, res) => {
    if (req.method === 'GET') {
        try {
            const data = await formProject();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'POST') {
        try {
            await registerProject(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al procesar los datos.' });
        }
    } else {
        // Manejar otros métodos HTTP si es necesario
        res.status(405).send('Método HTTP no permitido');
    }
}
export const getProjectsByResponsable = async (req, res) => {
    try {
        const projects = await ProjectModel.findAll({
            where: { id_responsable: req.params.id_responsable },
            include: [
              { model: AreaModel, as: 'area' },
              { model: CategoryModel, as: 'category' }
            ]
          });
  
      // Aplanar los datos
      const flattenedProjects = projects.map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        linkVideo: project.linkVideo,
        linkPoster: project.linkPoster,
        statusGeneral: project.statusGeneral,
        statusPoster: project.statusPoster,
        statusVideo: project.statusVideo,
        area: project.area.name,
        category: project.category.title,
        person: project.person,
        student: project.student,
        team: project.team,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      }));
  
      res.json(flattenedProjects);
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
async function getProjectById(id) {
    try {
        const project = await ProjectModel.findByPk(id);

        // Verificar si se encontró el proyecto
        if (!project) {
            throw new Error('El proyecto no fue encontrado.');
        }

        return project;
    } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        console.error('Error al obtener el proyecto:', error);
        throw error;
    }
}

async function updateProjectById(req,res) {
    try {
        console.log(req.body)
        await ProjectModel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}


export const handleEdition = async (req, res) => {
   
    console.log(req.method);

    if (req.method === 'GET') {
        try {
            const data = await getProjectById(req.params.id);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'PUT') {
        try {
            console.log(req.body);
            await updateProjectById(req, res);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al procesar los datos.' });
        }
    } else {
        res.status(405).send('Método HTTP no permitido');
    }
};

async function getProjectByStudentID(id_student) {
    try {
        const projects = await ProjectModel.findAll({
            where: {
                id_lider: id_student
            },
            include:[
                {model: CategoryModel}
            ]

    
    })
        // Verificar si se encontró el proyecto
        if (!projects) {
            throw new Error('El proyecto no fue encontrado.');
        }

        return projects;
    } catch (error) {
        // Manejar cualquier error que ocurra durante la consulta
        console.error('Error al obtener el proyecto:', error);
        throw error;
    }
}


async function deleteProjectByID(id_project) {
    const transaction = await db.transaction();
    try {
        console.log(`Iniciando eliminación del proyecto con id: ${id_project}`);

        // Eliminar equipos relacionados
        const teamDeleteCount = await TeamModel.destroy({
            where: { id_project: id_project },
            transaction
        });
        console.log(`Equipos eliminados: ${teamDeleteCount}`);

        const materialsDeleteCount = await MaterialProjectModel.destroy({
            where: { id_project: id_project },
            transaction
        });
        console.log(`Materiales eliminados: ${materialsDeleteCount}`);

        // Eliminar el proyecto
        const projectDeleteCount = await ProjectModel.destroy({
            where: { id: id_project },
            transaction
        });
        console.log(`Proyectos eliminados: ${projectDeleteCount}`);

        // Si todas las eliminaciones fueron exitosas, confirmar la transacción
        await transaction.commit();
        console.log(`Eliminación del proyecto con id: ${id_project} completada exitosamente`);

        return { message: 'Proyecto y sus registros relacionados eliminados correctamente.' };
    } catch (error) {
        // Si hubo algún error, revertir la transacción
        await transaction.rollback();

        // Manejar cualquier error que ocurra durante la consulta
        console.error('Error al eliminar el proyecto y sus registros relacionados:', error);
        throw error;
    }
}


export const handleResumen = async (req, res) => {
    console.log(`Método HTTP recibido: ${req.method}`);

    if (req.method === 'GET') {
        try {
            const data = await getProjectByStudentID(req.params.id);
            res.json(data);
        } catch (error) {
            console.error('Error al obtener proyectos:', error);
            res.status(500).json({ message: error.message });
        }
    } else if (req.method === 'DELETE') {
        try {
            const message = await deleteProjectByID(req.params.id);
            console.log('Mensaje de eliminación:', message);
            res.json(message);
        } catch (error) {
            console.error('Error al eliminar el proyecto:', error);
            res.status(500).json({ error: 'Hubo un error al eliminar el proyecto.' });
        }
    } else {
        res.status(405).send('Método HTTP no permitido');
    }
};

//** Extra Methods **/

// Fetch project status data for the doughnut chart
export const getProjectStatusData = async (req, res) => {
  try {
    const reviewedCount = await ProjectModel.count({
      where: {
        statusGeneral: 'revisado'
      }
    });

    const pendingCount = await ProjectModel.count({
      where: {
        statusGeneral: 'en revision'
      }
    });

    res.json({
      labels: ['Revisado', 'Pendiente'],
      data: [reviewedCount, pendingCount]
    });
  } catch (error) {
    console.error('Error fetching project status data:', error);
    res.status(500).json({ error: 'Internal server error while fetching project status data.' });
  }
};

// controllers/MaterialController.js
export const getMaterialChecklistItems = async (req, res) => {
    try {
        // Fetch all materials
        const materials = await MaterialModel.findAll();

        // Fetch the total amounts for each material
        const totalAmounts = await MaterialProjectModel.findAll({
            attributes: [
                'id_material',
                [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']
            ],
            group: ['id_material']
        });

        // Convert the totals to a lookup object
        const totalAmountsLookup = totalAmounts.reduce((acc, item) => {
            acc[item.id_material] = item.dataValues.totalAmount;
            return acc;
        }, {});

        // Format materials into checklist items
        const checklistItems = materials.map(material => ({
            id: material.id,
            text: `${material.name} (${totalAmountsLookup[material.id] || 0})`, // Name with total amount in brackets
        }));

        res.json(checklistItems);
    } catch (error) {
        console.error("Error fetching checklist items:", error);
        res.status(500).json({ error: "Internal server error while fetching checklist items." });
    }
};

