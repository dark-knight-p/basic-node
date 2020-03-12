var mongoose=require("mongoose");
var schema=mongoose.Schema;
var objectid=mongoose.Schema.Types.ObjectId;

var wishlist=new schema({
    title:{type:String,default:"cool wish list"},
    products:[{type:objectid,ref:'Product'}] //relationship
});

module.exports=mongoose.model('WishList',wishlist);

