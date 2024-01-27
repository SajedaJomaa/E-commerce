import {Router} from 'express';
import * as subcategioriesController from './subcategory.controller.js';
import fileUpload, { fileValidation } from '../../servecies/multer.js';
import { asyncHandler } from '../../servecies/errorHandling.js';
const router = Router({mergeParams:true});

router.post('/',fileUpload(fileValidation.image).single('image'),asyncHandler(subcategioriesController.createSubCategory));
router.get('/',asyncHandler(subcategioriesController.getSubCategories));


export default router;