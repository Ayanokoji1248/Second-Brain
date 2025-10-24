import dotenv from "dotenv"
dotenv.config()
import express from "express"
import dbConnect from "./config/DbConnection.js";
const app = express();



async function main() {
    await dbConnect();
    app.listen(process.env.PORT, () => {
        console.log("Server running on port 3000")
    })
}

main()