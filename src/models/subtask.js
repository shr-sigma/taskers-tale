const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index').getSequelize();
const task = require('./model')
const log = require('./log')

const subtask = sequelize.define('subtask', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  taskId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  subtask: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 0
  },
  startDate: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 0
  },
  endDate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
  {
    tableName: 'subtask'
  }
);

subtask.belongsTo(task, { foreignKey: 'taskId' });
log.belongsTo(subtask, { foreignKey: 'subtaskId' });
subtask.hasMany(log, { foreignKey: 'subtaskId' });

module.exports = subtask
