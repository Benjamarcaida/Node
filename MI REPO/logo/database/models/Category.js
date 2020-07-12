module.exports = function(sequelize, dataTypes) {
	let alias = 'Category';

	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		category_name: {
			type: dataTypes.STRING
		}
	};

	let config = {
		tableName: "categories",
		timestamps: false
	}

	let Category = sequelize.define(alias, cols, config);

	Category.associate = function(models) {
        Category.belongsToMany(models.Product, {
            as: "products",
            through: "category_product",
            foreignKey: "category_id",
            otherKey: "product_id",
            timestamps: false
		});
	}

	return Category;
}