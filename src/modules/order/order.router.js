import {Router} from 'express';
import * as orderController from './order.controller.js';
import * as validatores from './order.validation.js';
import { validation } from '../../middleware/validation.js';
import { auth } from '../../middleware/Auth.js';
import { endPoint } from './order.endpoint.js';

const router = Router();


router.post('/',auth(endPoint.create),orderController.createOrder);


export default router;