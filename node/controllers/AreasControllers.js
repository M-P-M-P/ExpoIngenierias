import AreaModel from "../models/AreaModel.js";

export const updateArea = async(req,res)=>{
    try{
        await AreaModel.update(req.body,{
            where: {id:req.params.id}
        })
        res.status(201).json({
            message: "Area correctamente actualizada!"
        })
    }catch(error){
        res.json({message:error.message});
    }
};