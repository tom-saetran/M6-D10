import express from "express"
import cors from "cors"
import db from "./db/index.js"
import services from "./services/index.js"
import listEndpoints from "express-list-endpoints"

const server = express()

server.use(cors())
server.use(express.json())
server.use("/", services)
const port = process.env.PORT || 5000

db.sequelize
    .sync({ force: false })
    .then(() => {
        server.listen(port, () => {
            console.table(listEndpoints(server))
            console.log("Server is running on port: " + port)
        })
        server.on("error", error => console.info(" ❌ Server is not running due to : ", error))
    })
    .catch(e => console.log(e))
