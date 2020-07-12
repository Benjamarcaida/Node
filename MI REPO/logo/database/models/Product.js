module.exports = function(sequelize, dataTypes) {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        brand_id: {
            type: dataTypes.INTEGER
        },
        colour_id: {
            type: dataTypes.INTEGER
        },
        gender_id: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.DOUBLE
        },
        sale: {
            type: dataTypes.BOOLEAN
        }

    }
    let config = {
        tableName: "products",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.Gender, {
			as: "gender",
			foreignKey: "gender_id"
        });
        Product.belongsTo(models.Brand, {
			as: "brand",
			foreignKey: "brand_id"
		});
        Product.hasMany(models.Image, {
			as: "images",
			foreignKey: "productid"
		});
        Product.belongsToMany(models.Cart, {
            as: "carts",
            through: "cart_product",
            foreignKey: "product_id",
            otherKey: "cart_id",
            timestamps: false
        });
        Product.belongsToMany(models.User, {
            as: "users",
            through: "product_user",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false
        });
        Product.belongsToMany(models.Colour, {
            as: "colours",
            through: "colour_product",
            foreignKey: "product_id",
            otherKey: "colour_id",
            timestamps: false
        });
        Product.belongsToMany(models.Size, {
            as: "sizes",
            through: "product_size",
            foreignKey: "product_id",
            otherKey: "size_id",
            timestamps: false
        });
        Product.belongsToMany(models.Category, {
            as: "categories",
            through: "category_product",
            foreignKey: "product_id",
            otherKey: "category_id",
            timestamps: false
        });
    }

    return Product;
}