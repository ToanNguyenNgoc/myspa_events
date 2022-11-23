module.exports = (sequelize, Sequelize, DataTypes) => {
  const Customers = sequelize.define("customers", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    query: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Customers;
};
