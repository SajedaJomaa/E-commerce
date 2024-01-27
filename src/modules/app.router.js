import connectDB from '../../DB/connection.js';
import categioriesRouter from './categiories/categiories.router.js';
import productsRouter from './products/products.router.js';
import AuthRouter from './Auth/auth.router.js';
import subCategoryRouter from './subcategory/subcategory.router.js';
import couponRouter from './coupon/coupon.router.js';
import cartRouter from '../modules/cart/cart.router.js';
import orderRouter from '../modules/order/order.router.js';
import { globalErrorHandler } from '../servecies/errorHandling.js';


const initApp = async (app,express)=>{
        app.use(express.json());
        connectDB();
        app.get('/',(req,res)=>{
            return res.status(200).json({message:"Welcome"});
        })
        app.use('/auth',AuthRouter);
        app.use('/categiories',categioriesRouter);
        app.use('/products',productsRouter);
        app.use('/subcategory',subCategoryRouter);
        app.use('/coupon',couponRouter);
        app.use('/cart',cartRouter);
        app.use('/order',orderRouter);

     
     
        app.get('*',(req,res)=>{
            return res.status(200).json({message:"Page not found"});
        })

        app.use(globalErrorHandler);
    
   
}

export default initApp;