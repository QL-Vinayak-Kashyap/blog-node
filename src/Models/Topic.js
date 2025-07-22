const {DataTypes, Model} = require('sequelize'); 

const sequelize = require('../config/databases');
const User = require('./User');
const Post = require('./Post');

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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: 'User',
            //     key: 'id'
            //   }
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


Topic.hasMany(
    Post,
    {
        foreignKey: 'topic_id',
        as: 'posts', // Alias for the association
        onDelete: 'CASCADE', // Optional: define what happens on delete     
    }
); // Assuming you have an Activity model

Post.belongsTo(
    Topic,  
    {
        foreignKey: 'topic_id',
        as: 'topic', // Alias for the association
    }
); // Assuming you have an Activity model

module.exports = Topic;