const {Model, DataTypes} = require('sequelize');

const sequelize = require('../../config/databases'); // Assuming you have a sequelize instance exported from this file

class Activity extends Model { }

Activity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
       like: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Assuming you have a users table
                key: 'id'
            }
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'posts', // Assuming you have a posts table
                key: 'id'
            }
        },
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'topics', // Assuming you have a topics table
                key: 'id'
            }
        },
    },{
        sequelize,
        modelName: 'Activity',
        tableName: 'activities',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)   

module.exports = Activity;