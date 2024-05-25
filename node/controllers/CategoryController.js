import {CategoryModel} from "../models/Relations.js";
import{ProjectModel} from "../models/Relations.js";

import  sequelize  from "../database/db.js";

export const updateCategory = async(req,res)=>{
    try{
        await CategoryModel.update(req.body,{
            where : {id:req.params.id}
        })
        res.status(201).json({
            message:"Categoria correctamente actualizada!"
        })
    }catch(error){
        res.json({message:error.message});
    }
};

export const getCategoryProjectData = async (req, res) => {
    try {
      const categories = await CategoryModel.findAll({
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