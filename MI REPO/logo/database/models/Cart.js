module.exports = function(sequelize, dataTypes) {
    let alias = "Cart";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        state: {
            type: dataTypes.BOOLEAN
        },
        sale_date: {
            type: dataTypes.DATE
        },
        total: {
            type: dataTypes.DOUBLE
        },
        user_id: {
            type: dataTypes.INTEGER
        }

    }
    let config = {
        tableName: "carts",
        timestamps: false
    }
    let Cart = sequelize.define(alias, cols, config);

    Cart.associate = function(models) {
        Cart.belongsToMany(models.Product, {
            as: "products",
            through: "cart_product",
            foreignKey: "cart_id",
            otherKey: "product_id",
            timestamps: false
        });
    }

    return Cart;
}