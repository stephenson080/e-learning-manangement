import Mongoose from 'mongoose'
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
async function connectDatabase(){
    try {
        await Mongoose.connect(process.env.DB_CONNECTION as string) 
    } catch (error) {
        throw error
    }
}

export default connectDatabase