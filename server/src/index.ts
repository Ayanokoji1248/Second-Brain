import dotenv from "dotenv"
dotenv.config()
import express from "express"
import dbConnect from "./config/DbConnection.js";
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js";
import cors from "cors"
import userRouter from "./routes/user.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter)

async function main() {
    await dbConnect();
    app.listen(process.env.PORT, () => {
        console.log("Server running on port 3000")
    })
}

main()