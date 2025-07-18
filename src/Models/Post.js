const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/databases'); // Assuming you have a sequelize instance exported from this file

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Assuming you have a users table
                key: 'id'
            }
        },
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'topics', // Assuming you have a topics table
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

module.exports = Post;