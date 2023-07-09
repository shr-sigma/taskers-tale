const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index').getSequelize();
const subtask = require('./subtask')

const log = sequelize.define('log', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  subtaskId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
},
  {
    timestamps: true,
  },
  {
    tableName: 'log'
  }
);

// Define associations between the models
// Subtask.belongsTo(task, { foreignKey: 'taskId' });

// Subtask.hasMany(Log, { foreignKey: 'subtaskId' });
log.belongsTo(subtask, { foreignKey: 'subtaskId' });
subtask.hasMany(log, { foreignKey: 'subtaskId' });

module.exports = log

