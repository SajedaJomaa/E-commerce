import slugify from "slugify";
import categoryModel from "../../../DB/category.model.js";
import subCategoryModel from "../../../DB/subcategory.model.js";
import cloudinary from "../../servecies/cloudinary.js";
import productModel from "../../../DB/product.model.js";

export const getProducts = (req,res,next)=>{
    return res.json("products ...");
}

export const createProducts = async (req,res,next)=>{
    const {name,price,discount,categoryId,subcategoryId} = req.body;
    const checkCategory = await categoryModel.findById(categoryId);
    if(!checkCategory){
        return res.status(404).json({message:"category not found"});
    }
    const checkSubCategory = await subCategoryModel.findById(subcategoryId);
    if(!checkSubCategory){
        return res.status(404).json({message:"subcategory not found"});
    }
    req.body.slug = slugify(name);
    req.body.finalPrice = price - (price * (discount || 0) / 100).toFixed(2);

    const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,
        {folder:`${process.env.APP_NAME}/products/${req.body.name}/mainImage`});
    req.body.mainImage={secure_url,public_id};
    req.body.subImages = [];
    for(const file of req.files.subImages){
        const {secure_url,public_id}= await cloudinary.uploader.upload(file.path,
            {folder:`${process.env.APP_NAME}/products/${req.body.name}/subImages`});
            req.body.subImages.push({secure_url,public_id});
    }
    req.body.createdBy=req.user._id;
    req.body.updatedBy=req.user._id;
    const product = await productModel.create(req.body);
    if(!product){
        return res.status(400).json({message:"error while creating product"});
    }
    return res.status(201).json({message:"success",product});

}