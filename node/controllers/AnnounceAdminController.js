import AnnounModel from "../models/AnnounceModel.js";

export const createAnnounce = async(req,res)=>{
    const {title,description, audience, multimedia}=req.body;
    try{
        const newAnnounce= await AnnounModel.create({title,description, audience, multimedia});
        res.status(201).json(newAnnounce)
    }catch (error){
        res.status(400).json({error:error.message});
        console.log("loco");
    }
};