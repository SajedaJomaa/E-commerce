import {Router} from 'express';
import * as CartController from './cart.controller.js';
import { endPoint } from './cart.endpoint.js';
import { auth } from '../../middleware/Auth.js';
import { asyncHandler } from '../../servecies/errorHandling.js';




const router = Router();
router.post('/',auth(endPoint.create),asyncHandler(CartController.createCart));
router.patch('/removeItem',auth(endPoint.delete),asyncHandler(CartController.removeItem));
router.patch('/clear',auth(endPoint.clear),asyncHandler(CartController.clearCart));
router.get('/',auth(endPoint.get),asyncHandler(CartController.getCart));


export default router;