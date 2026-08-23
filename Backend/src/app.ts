import express from 'express'
import router from './routes/auth.route';
import routers from './routes/post.route';
import cookieParser from 'cookie-parser';
import commentRouter from './routes/comment.route'; 
import cors from 'cors'
const app=express();
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true
    })
)
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",router);
app.use("/api/posts",routers);
app.use("/api/posts",commentRouter)

export default app
