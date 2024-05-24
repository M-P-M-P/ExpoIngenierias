import Category from "../models/CategoryModel.js";
import ProjectModel from "../models/ProjectsModel.js";

import  sequelize  from "../database/db.js";

async function updateCategory(req,res) {
    try{
        await Category.update(req.body,{
            where : {id:req.params.id}
        })
        res.status(201).json({
            message:"Categoria correctamente actualizada!"
        })
    }catch(error){
        res.json({message:error.message});
    }
};

async function getCategoryProjectData(req, res) {
    try {
      const categories = await Category.findAll({
        include: [{
          model: ProjectModel,
          attributes: []
        }],
        attributes: [
          'title',
          [sequelize.fn('COUNT', sequelize.col('projects.id')), 'projectCount']
        ],
        group: ['categories.id', 'categories.title']
      });
  
      const labels = categories.map(category => category.title);
      const data = categories.map(category => category.get('projectCount'));
  
      res.json({ labels, data });
    } catch (error) {
      console.error("Error fetching category project data:", error);
      res.status(500).json({ error: 'Internal server error while fetching category project data.' });
    }
  }

// Obtener todas las categorías
async function getAllCategories(req, res) {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ error: 'Error al obtener las categorías.' });
  }
}

export { updateCategory, getCategoryProjectData, getAllCategories };
