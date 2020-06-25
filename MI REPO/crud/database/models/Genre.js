module.exports = (sequelize, dataTypes) => {
    let alias = "Genre";
    let cols = {
        /*id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },*/

        name : {
            type : dataTypes.STRING
        },

        ranking : {
            type : dataTypes.INTEGER
        }
    }

    let config = {
        timestamps : false
    } 
    
    const Genre = sequelize.define(alias, cols, config);
    Genre.associate = function(models) {
        Genre.hasMany(models.Movies, {
            foreignKey:"genre_id",
            as:"peliculas"
        })
    }
    return Genre;
    
}
