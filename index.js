const userRoute=require('./routes/userRoute');
const videoRoute=require('./routes/videoRoute');

const express=require('express');
const app=express();
app.use(express.json());

const dbconfig=require('./db');

const cors=require('cors');
app.use(cors({
    orgin:"*",
    credentials:true
}));

app.use('/api/users',userRoute);
app.use('/api/video',videoRoute);

app.use('/api/videos',express.static('media/uploads'));


app.get("/", (req, res) =>
  res.send(`Server Running successfully.....!`)
);

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`server running on port ${port}`));