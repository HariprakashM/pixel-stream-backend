const userRoute=require('./routes/userRoute');

const newvideoRoute=require('./routes/newvideo');

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

app.use('/api/newvideo',newvideoRoute);


app.get("/", (req, res) =>
  res.send(`Server Running successfully.....!`)
);

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`server running on port ${port}`));