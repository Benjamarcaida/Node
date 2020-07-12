module.exports = function(sequelize, dataTypes) {
	let alias = 'Subcategory';

	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		subcategory_name: {
			type: dataTypes.STRING
        },
        product_id: {
            type: dataTypes.INTEGER
        }
	};

	let config = {
		tableName: "subcategories",
		timestamps: false
	}

	let Subcategory = sequelize.define(alias, cols, config);

	return Subcategory;
}