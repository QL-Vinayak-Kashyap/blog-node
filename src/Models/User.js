const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/databases");

class User extends Model { }

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING(255), // matches DB
      allowNull: false,
      unique: true, // optional if your DB has a unique index
    },
    email: {
      type: DataTypes.STRING(255), // match DB
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "AUTHOR",
    },
    password: {
      type: DataTypes.STRING(100), // match DB
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true, // optional but matches snake_case style
  }
);

module.exports = User;
