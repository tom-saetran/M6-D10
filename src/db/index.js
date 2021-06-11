import pg from "pg"
import s from "sequelize"
import ProductModel from "./products.js"
import ReviewModel from "./reviews.js"
import CategoryModel from "./categories.js"
import ProductCategoryModel from "./product_category.js"
import CartModel from "./carts.js"
import UserModel from "./users.js"

const Sequelize = s.Sequelize
const DataTypes = s.DataTypes

const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env
const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    dialect: "postgres"
})

const pool = new pg.Pool()

const models = {
    Product: ProductModel(sequelize, DataTypes),
    Review: ReviewModel(sequelize, DataTypes),
    Category: CategoryModel(sequelize, DataTypes),
    ProductCategory: ProductCategoryModel(sequelize, DataTypes),
    Cart: CartModel(sequelize, DataTypes),
    User: UserModel(sequelize, DataTypes),

    sequelize: sequelize,
    pool: pool
}

const { Product, Review, Category, ProductCategory, Cart, User } = models

Product.hasMany(Review)
Review.belongsTo(Product)

Product.belongsToMany(Category, { through: { model: ProductCategory, unique: false } })
Category.belongsToMany(Product, { through: { model: ProductCategory, unique: false } })

Product.belongsToMany(User, { through: { model: Cart, unique: false } })
User.belongsToMany(Product, { through: { model: Cart, unique: false } })

export default models
