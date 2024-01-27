import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const createProducts = joi.object({
    name:joi.string().min(3).max(25).required(),
    discription:joi.string().min(2).max(150000),
    stock:joi.number().integer().required(), // عدد صحيح لانه معناها ايش الكمية اللي عندي 
    price:joi.number().positive().required(),
    discount:joi.number().positive().min(1),
    file:joi.object({
        mainImage:joi.array().items(generalFields.file.required()).length(1),
        subImages:joi.array().items(generalFields.file.required()).min(2).max(4)
    }),
    status:joi.string().valid('Active','Inactive'),
    categoryId:joi.string().required(),
    subcategoryId:joi.string().required()
    
}).required();

export const getSpecificCategory = joi.object({
    id:joi.string().min(24).max(24).required(),
    //file:joi.array().items(generalFields.file.required()).required(),//لما يكون عندي اريه من الصور 
})
