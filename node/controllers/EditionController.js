import {EditionModel,ProjectModel,StudentModel,PersonModel,CriteriaModel,CommentModel} from "../models/Relations.js";

export const getAllEditions = async (req,res)=>{
    try{
        const Editions = await EditionModel.findAll()
        res.json(Editions);
    }catch (error){
        res.json({message: error.message});
    }
};

export const downloadHistoric = async (req, res)=>{
    try{
        
    }catch (error){
        res.json({message:error.message})
    }
};