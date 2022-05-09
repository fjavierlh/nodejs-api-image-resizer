import { DataTypes } from 'sequelize';
import sequelize from '../../infrastructure/core/config/postgres.config';
import TaskStatus from '../../domain/Task/model/TaskStatuses';

const TaskSchema = sequelize.define(
  'tasks',
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
    updated_at: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    path_to_source: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(
        TaskStatus.READY,
        TaskStatus.PROCCESSING,
        TaskStatus.DONE
      ),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

export default TaskSchema;
