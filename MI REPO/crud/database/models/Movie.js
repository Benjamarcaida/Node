module.exports = (sequelize, dataTypes) => {
    let alias = "Movies";
    let cols = {
        /*id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },*/

        title : {
            type : dataTypes.STRING
        },

        length : {
            type : dataTypes.INTEGER
        },
        release_date : {
            type: dataTypes.DATE
        },
        awards : {
            type : dataTypes.INTEGER
        },
        rating : {
            type : dataTypes.INTEGER
        },
        genre_id : {
            type : dataTypes.INTEGER
        }
    }

    let config = {
        timestamps : false
    } 
    
    const Movie = sequelize.define(alias, cols, config);
    Movie.associate = function(models) {
        Movie.belongsTo(models.Genre, {
            foreignKey:"genre_id",
            as:"generos"
        }),
        Movie.belongsToMany(models.Actors, {
            as: "Actors",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: false
        })
    }
    return Movie;

}
