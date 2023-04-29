import Mongoose from 'mongoose'
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
async function connectDatabase(){
    try {
        console.log('Connecting to DB...')
        await Mongoose.connect(process.env.DB_CONNECTION as string) 
        console.log('DB connected')
    } catch (error) {
        throw error
    }
}

export default connectDatabase