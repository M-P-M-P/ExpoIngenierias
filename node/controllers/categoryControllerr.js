import AnnounModel from "../models/AnnounceModel.js";

export const createCategory = async(req,res)=>{
    try{
        const newAnnounce= await AnnounModel.create(req.body);
        console.log("Nuevo Categoria creada creado: ", newAnnounce.toJSON());
        res.status(201).json({newAnnounce});
    }catch (error){
        res.status(400).json({error:error.message});
    }
};