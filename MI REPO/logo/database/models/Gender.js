module.exports = function(sequelize, dataTypes) {
	let alias = 'Gender';

	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		gender_name: {
			type: dataTypes.STRING
		}
	};

	let config = {
		tableName: "genders",
		timestamps: false
	}

	let Gender = sequelize.define(alias, cols, config);

	Gender.associate = function(models) {
		Gender.hasMany(models.Product, {
			as: "products",
			foreignKey: "gender_id"
		})
	}
	return Gender;
}