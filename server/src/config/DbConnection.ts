import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log("Connected to DB");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default dbConnect;