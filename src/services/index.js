import express from "express"
const route = express.Router()

import productsRoute from "./products/index.js"
import reviewsRoute from "./reviews/index.js"
import categoriesRoute from "./categories/index.js"
import cartsRoute from "./cart/index.js"
import usersRoute from "./users/index.js"

route.use("/products", productsRoute)
route.use("/reviews", reviewsRoute)
route.use("/categories", categoriesRoute)
route.use("/cart", cartsRoute)
route.use("/users", usersRoute)

export default route
