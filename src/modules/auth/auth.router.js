import {Router} from 'express';
import * as AuthController from './auth.controller.js';
import fileUpload, { fileValidation } from '../../servecies/multer.js';
import { asyncHandler } from '../../servecies/errorHandling.js';


const router = Router();
router.post('/signup',fileUpload(fileValidation.image).single('image'),asyncHandler(AuthController.signup));
router.post('/signin',asyncHandler(AuthController.signin));
router.get('/confirmEmail/:token',asyncHandler(AuthController.confirmEmail));
router.patch('/sendCode',asyncHandler(AuthController.sendCode));
router.patch('/forgetPassword',asyncHandler(AuthController.forgetPassword));
router.delete('/deleteInvalidConfirm',asyncHandler(AuthController.deleteInvalidConfirm));


export default router;