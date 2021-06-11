import express from "express"
const route = express.Router()

import productsRoute from "./products/index.js"
import reviewsRoute from "./reviews/index.js"

route.use("/products", productsRoute)
route.use("/reviews", reviewsRoute)

export default route
