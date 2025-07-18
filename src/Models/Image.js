const {Model, DataTypes} =require('sequelize');

const sequelize = require('../../config/databases'); // Assuming you have a sequelize instance exported from this file


class Image extends Model { }

Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'posts', // Assuming you have a posts table
                key: 'id'
            }
        },
    },{
        sequelize,
        modelName: 'Image',
        tableName: 'images',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
)

module.exports = Image;