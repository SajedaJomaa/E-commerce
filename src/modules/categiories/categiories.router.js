import {Router} from 'express';
import * as categioriesController from './categiories.controller.js';
import fileUpload, { fileValidation } from '../../servecies/multer.js';
import subCategoryRouter from '../subcategory/subcategory.router.js';
import { auth, roles } from '../../middleware/Auth.js';
import { endPoint } from './category.endpoint.js';
import { asyncHandler } from '../../servecies/errorHandling.js';
import * as validator  from './categories.valedation.js';
import { validation } from '../../middleware/validation.js';
const router = Router();

router.use('/:id/subcategory',subCategoryRouter)
router.get('/',auth(Object.values(roles)),asyncHandler(categioriesController.getCategories));
router.get('/active',auth(endPoint.getActive),asyncHandler(categioriesController.getActiveCategory));

router.get('/:id',auth(endPoint.specific),validation(validator.getSpecificCategory),asyncHandler(categioriesController.getSpecificCategory));
router.post('/',auth(endPoint.create),fileUpload(fileValidation.image).single('image'),validation(validator.createCategory),asyncHandler(categioriesController.createCategory));
router.put('/:id',auth(endPoint.update),fileUpload(fileValidation.image).single('image'),asyncHandler(categioriesController.updateCategory));

export default router;