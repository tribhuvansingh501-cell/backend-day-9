require("dotenv").config()
const connectToDb = require("./src/config/database")
connectToDb();

const app = require("./src/app")
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})