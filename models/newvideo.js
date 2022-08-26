const mongoose=require('mongoose');

const videoSchema=mongoose.Schema({
    uploader_name:{type:String,required:true},
    movie:{type:String,required:true},
    title:{type:String,required:true},
    video_link:{type:String,required:true},
    thumbnail_img:{type:String,required:true},
    cast:{type:String,required:true},
    catagory:{type:String,required:true},
    
},{timestamps:true});

const videoModel=mongoose.model('formvideo', videoSchema);
module.exports=videoModel;