import mongoose from "mongoose";

//resetting mongoose to don't use strict mode
mongoose.set("strictQuery", false);

const connectionToDB = async () => {
try {
    const {connection} = await mongoose
    .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lms_db");

    if(connection){
        console.log(`Connected to database successfully ${connection.host}`)
    }
} catch (error) {
    console.log(error)
    process.exit(1)
}
};

export default connectionToDB;