export default (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        _id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })
    return User
}
