import express from "express"
import router from "./routes/router.js"
import cors from "cors"
import { updateCategoryTrends } from './services/pricing.service.js'

const app = express()
const port =  5000

app.use(express.json())
app.use(cors())
app.use("/", router)

app.listen(port, (error) => {
    if(error){
        console.log("Error running the server.")
    }
    console.log("Server is listening at port: ", port)
})

// Initial fetch and periodic update every 24 hours
setInterval(updateCategoryTrends, 24 * 60 * 60 * 1000); // <-- 24 hours in ms
