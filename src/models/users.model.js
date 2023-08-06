import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db.config.js";

export const Users = sequelize.define('Users', {
    // Model attributes
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull:false,
    }
  }, {
    // Other model options go here
    tableName: 'testtablefortim',
    paranoid:true,
  }
);