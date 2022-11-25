module.exports = (sequelize, Sequelize, DataTypes) => {
  const Customers = sequelize.define(
    "customers",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
      },
      check_in: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ticket: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updated_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Customers;
};
