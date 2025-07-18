const {DataTypes, Model} = require('sequelize'); 

const sequelize = require('../config/databases');

class Topic extends Model { }

Topic.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255), // matches DB  
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Assuming you have a users table
                key: 'id'
            } 
        }
    },{
        sequelize,
        modelName: 'Topic',
        tableName: 'topics',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

module.exports = Topic;