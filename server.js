var express =require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
//database connection
var db=mongoose.connect("mongodb://localhost/test",{useNewUrlParser:true,useUnifiedTopology:true});
var Product=require('./Models/product');
var WishList=require('./Models/wishlist');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.post('/product',function(req,res){
    var pro=new Product();
    pro.title=req.body.title;
    pro.price=req.body.price;
    pro.save(function(err,savedProduct){
        if(err){
            res.status(500).send({err:"Could not save product"});
        }else{
            res.status(200).send(savedProduct);
        }
    });
});
app.post('/wishlist',function(req,res){
    var wish=new WishList(); 
    wish.title=req.body.title;   
    wish.save(function(err,wishlist){
        if(err){
            res.status(500).send({err:"Could not save wishlistwi"});
        }else{
            res.status(200).send(wishlist);
        }
    });
});
app.get('/wishlist',function(req,res){
    WishList.find({},function(err,wishlist){
        if(err){
            res.status(500).send({err:"could not fetch products"});
        }else{
            res.status(200).send(wishlist);
        }
    });
});
app.get('/product',function(req,res){
    Product.find({},function(err,products){
        if(err){
            res.status(500).send({err:"could not fetch products"});
        }else{
            res.status(200).send(products);
        }
    });
});
app.put('/wishlist/product/add',function(req,res){
    //find product
    Product.findOne({_id:req.body.productid},function(err,product){
        if(err){
            res.status(500).send({err:"could not add product to wishlist"});
        }else{
            WishList.updateOne({_id:req.body.wishlistid},{$addToSet:{products:product._id}},function(err,wishlist){
                if(err){
                    res.status(500).send({err:"could not add product to wishlist"});
                }else{
                    res.status(200).send(wishlist);
                }
            });            
        }
    });
});

//running server
app.listen(3000,function(){
    console.log("Server is running ");
});