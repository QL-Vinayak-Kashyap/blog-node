const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/databases'); // Assuming you have a sequelize instance exported from this file
const Image = require('./Image'); // Assuming you have an Image model defined in Image.js

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User', // Assuming you have a User model
                key: 'id'
            }
        },
        topic_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Topic', // Assuming you have a Topic model
                key: 'id'
            }
        },
    },{
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

Post.hasMany(
    Image,
    {
        foreignKey:"post_id",
        as:'images',
        onDelete:"CASCADE", // Optional: define what happens on delete
    }
)

Image.belongsTo(
    Post,
    {
        foreignKey: 'post_id',
        as: 'post', // Alias for the association
    }   
)

module.exports = Post;