const { DataTypes } = require("sequelize");
const Cart = require("./Cart");
const Product = require("./Product");

module.exports = (sequelize) => {
  sequelize.define(
    "cart_product",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      cartid: {
        type: DataTypes.INTEGER,
        references: {
          model: Cart,
          key: "id",
        },
        allowNull: false,
      },
      productid: {
        type: DataTypes.INTEGER,
        references: {
          model: Product,
          key: "id",
        },
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      conclusion: {
        type: DataTypes.STRING,
        defaultValue: "Pendiente"
      },
    },
    {
      timestamps: false,
    }
  );
};
