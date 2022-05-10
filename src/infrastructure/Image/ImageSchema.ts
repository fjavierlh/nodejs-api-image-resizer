import { DataTypes } from 'sequelize';
import sequelize from '../../infrastructure/core/config/postgres.config';

const ImageSchema = sequelize.define(
  'images',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    created_at: {
      type: DataTypes.STRING,
      allowNull: false
    },
    task_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    md5: {
      type: DataTypes.STRING,
      allowNull: false
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    path_to_source: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

export default ImageSchema;
