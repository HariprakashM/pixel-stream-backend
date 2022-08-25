const mongoose=require('mongoose');

const videoSchema=mongoose.Schema({
    uploader_name:{type:String,required:true},
    upload_title:{type:String,required:true},
    video_path:{type:String,required:true},
    thumbnail_path:{type:String,required:true},
    
},{timestamps:true});

const videoModel=mongoose.model('video', videoSchema);
module.exports=videoModel;