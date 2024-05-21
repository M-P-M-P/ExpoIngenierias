import CategoryModel from "../models/CategoryModel.js";

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