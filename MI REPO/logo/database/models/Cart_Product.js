module.exports = function(sequelize, dataTypes) {
	let alias = 'Cart_Product';

	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		quantity: {
			type: dataTypes.INTEGER
        },
        price: {
			type: dataTypes.DOUBLE
        },
        cart_id: {
            type: dataTypes.INTEGER
        },
        product_id: {
            type: dataTypes.INTEGER
        }
	};

	let config = {
		tableName: "cart_product",
		timestamps: false
	}

	let Model = sequelize.define(alias, cols, config);

	return Model;
}