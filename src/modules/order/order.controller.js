import cartModel from '../../../DB/cart.model.js';
import couponModel from '../../../DB/coupon.model.js';
import productModel from '../../../DB/product.model.js';
import orderModel from '../../../DB/order.model.js';
import userModel from '../../../DB/user.model.js';

export const createOrder = async(req,res,next)=>{
    const {couponName} = req.body;
    const cart = await cartModel.findOne({userId:req.user._id});
    if(!cart){
        return next(new Error(`cart is empty`,{cause:400}));
    }
   req.body.products = cart.products;

   if(couponName){
    const coupon = await couponModel.findOne({name:couponName});
    if(!coupon){
        return next(new Error(`coupon not found`,{cause:404}));
    }
    const currentDate = new Date();

    if(coupon.expireDate <= currentDate){
        return next(new Error(`this coupon has expired`,{cause:400}));
    }
    if(coupon.usedBy.includes(req.user._id)){
        return next(new Error(`coupon already used`,{cause:409}));
    }
    req.body.coupon = coupon;
   }
   let subTotals =0;
   let finalProductList=[];
   for(let product of req.body.products){
    console.log(product);
    const ckeckProduct = await productModel.findOne({
        _id:product.productId,
        stock:{$gte:product.quantity}
    })
    if(!ckeckProduct){
        return next(new Error(`product quantity not available`));

    }
    console.log(ckeckProduct);
    product=product.toObject();
    product.name=ckeckProduct.name;
    product.unitPrice=ckeckProduct.price;
    product.discount=ckeckProduct.discount;
    product.finalPrice=product.quantity * ckeckProduct.finalPrice;
    subTotals+=product.finalPrice;
    console.log(product);


    }

    const user = await userModel.findById(req.user._id);
    if(!req.body.address){
        req.body.address=user.address;
    }
    if(!req.body.phone){
        req.body.phone=user.phone;
    }
    const order= await orderModel.create({
        userId:req.user._id,
        products:finalProductList,
        finalPrice:subTotals - (subTotals * ((req.body.coupon?.amount || 0 )) / 100),
        address:req.body.address,
        phoneNumber:req.body.phone,
        couponName:req.body.couponName??'',
   })
   for(const product of req.body.products){
    await productModel.updateOne({_id:product.productId},{$inc:{stock:-product.quantity}})
   }
   if(req.body.coupon){
    await couponModel.updateOne({_id:req.body.coupon._id},{$addToSet:{usedBy:req.user._id}})
   }
   await cartModel.updateOne({userId:req.user._id},{
    products:[],

   })
   return res.status(201).json({message:"success",order});



}
