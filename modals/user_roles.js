module.exports = (sequelize, Sequelize, DataTypes) => {
  const UserRoles = sequelize.define(
    "user_roles",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      roleId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );

  return UserRoles;
};
