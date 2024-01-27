import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const createCategory = joi.object({
    name:joi.string().min(3).max(25).required(),
    file:generalFields.file.required(),// لما يكون عندي صورة واحدة
    //file:joi.array().items(generalFields.file.required()).required(),//لما يكون عندي اريه من الصور 

})

export const getSpecificCategory = joi.object({
    id:joi.string().min(24).max(24).required(),
    //file:joi.array().items(generalFields.file.required()).required(),//لما يكون عندي اريه من الصور 
})