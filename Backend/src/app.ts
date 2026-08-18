import express from 'express'
import router from './routes/auth.route';
import routers from './routes/post.route';
import cookieParser from 'cookie-parser';

const app=express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",router);
app.use("/api/posts",routers);

export default app
