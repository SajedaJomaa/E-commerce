import slugify from "slugify";
import categoryModel from "../../../DB/category.model.js";
import subCategoryModel from "../../../DB/subcategory.model.js";
import cloudinary from "../../servecies/cloudinary.js";


export const createSubCategory = async(req,res,next)=>{
    const {name,categoryId} = req.body;
    const subCategory =await subCategoryModel.findOne({name});
    if(subCategory){
        return res.status(409).json({message:`sub category ${name} already exists`});
    }
    const category = await categoryModel.findById(categoryId);
    if(!category){
        return res.status(404).json({message:"category not found"});
    }
    const {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APP_NAME}/subCategories`
    })
    const subcategory = await subCategoryModel.create({name,slug:slugify(name),categoryId,image:{secure_url,public_id}});
    return res.json({message:"success",subcategory});

}




export const getSubCategories = async(req,res,next)=>{
    const  categoryId = req.params.id;
    const category = await categoryModel.findById(categoryId);
    if(!category){
        return res.status(404).json({message:"category not found"});
    }
    const subCategories = await subCategoryModel.find({categoryId}).populate({
        path:'categoryId'
    });
    return res.status(200).json({message:"success",subCategories});

}
