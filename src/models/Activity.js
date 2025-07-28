const {Model, DataTypes} = require('sequelize');

const sequelize = require('../config/databases'); // Assuming you have a sequelize instance exported from this file

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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Assuming you have a users table
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'posts', // Assuming you have a posts table
                key: 'id'
            }
        },
        topic_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'topics', // Assuming you have a topics table
                key: 'id'
            }
        },
        activityType: {
            type: DataTypes.ENUM('LIKE', 'COMMENT'),
            allowNull: false,
            validate: {
                isIn: [['LIKE', 'COMMENT']]
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