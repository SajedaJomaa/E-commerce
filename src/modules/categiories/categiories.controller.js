import slugify from 'slugify'
import cloudinary from "../../servecies/cloudinary.js";
import categoryModel from "../../../DB/category.model.js";



export const getCategories =async(req,res,next)=>{
    const categiories = await categoryModel.find().populate('subcategory');
    return res.status(200).json({message:"success",categiories});
}

export const createCategory =async(req,res,next)=>{
        const name = req.body.name.toLowerCase();
    if(await categoryModel.findOne({name})){
        return res.status(409).json({message:"category name already exist"});
    }
    const {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APP_NAME}/categories`
    })
    const cat= await categoryModel.create({name,slug:slugify(name),image:{secure_url,public_id},
createdBy:req.user._id,updatedBy:req.user._id});
console.log(cat);
return res.status(201).json({message:"success",cat});
}

export const getSpecificCategory =async(req,res,next)=>{
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    return res.json({message:"success",category});
}

export const getActiveCategory = async(req,res,next)=>{
    try{
        const categories = await categoryModel.find({status:'Active'}).select('name image');
        return res.status(200).json({message:"success",categories});

    }catch(error){
        return res.json({err:err.stack})
    }
    
}


export const updateCategory = async(req,res,next)=>{
    const category = await categoryModel.findById(req.params.id);
    if(!category){
        return res.status(404).json({message:`Invalid category id ${req.parmas.id}`});
    }
    if(req.body.name){
        if(await categoryModel.findOne({name:req.body.name}).select('name')){
            return res.status(409).json({message:`category ${req.body.name} already exists`});
        }
        category.name = req.body.name;
        category.slug = slugify(req.body.name);
    }
    if(req.body.status){
        category.status=req.body.status;
    }
    if(req.file){
        const {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/categories`
        })
        await cloudinary.uploader.destroy(category.image.public_id) // احذف الصورة السابقة 
        category.image = {secure_url,public_id};   
    }
    category.updatedBy=req.user._id;
    await category.save();
    return res.status(200).json({message:"success",category});
}
