const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/databases");
const Topic = require("./Topic");
const Post = require("./Post");

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
  }
);

User.hasMany(
  Topic, // Assuming you have a Topic model
  {
    foreignKey: "user_id",
    as: "topics", // Alias for the association
    onDelete: "CASCADE", // Optional: define what happens on delete
  }
)

Topic.belongsTo(User,{
  foreignKey: "user_id",
  as: "user", // Alias for the association
});

User.hasMany(
  Post, // Assuming you have a Post model
  {
    foreignKey: "user_id",
    as: "post", // Alias for the association
    onDelete: "CASCADE", // Optional: define what happens on delete
  }
);

Post.belongsTo(User, {
  foreignKey: "user_id",  
  as: "user", // Alias for the association
});

module.exports = User;
