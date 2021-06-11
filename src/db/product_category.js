export default (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define("product_category", {
        _id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    })
    return ProductCategory
}
