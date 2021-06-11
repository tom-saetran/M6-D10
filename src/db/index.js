import pg from "pg"
import s from "sequelize"
import ProductModel from "./products.js"
import ReviewModel from "./reviews.js"

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

    sequelize: sequelize,
    pool: pool
}

models.Product.hasMany(models.Review)
models.Review.belongsTo(models.Product)

export default models
