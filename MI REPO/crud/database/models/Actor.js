module.exports = (sequelize, dataTypes) => {
    let alias = "Actors";
    let cols = {
        /*id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },*/

        first_name : {
            type : dataTypes.STRING
        },
        last_name : {
            type : dataTypes.STRING
        },

        rating : {
            type : dataTypes.INTEGER
        },
    }

    let config = {
        timestamps : false
    } 
    
    const Actor = sequelize.define(alias, cols, config);
    Actor.associate = function(models) {
        Actor.belongsToMany(models.Movies, {
            as: "Movies",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        })
    }
    return Actor;

}
