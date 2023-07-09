const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index').getSequelize();
// const subtask = require('./subtask')

const task = sequelize.define('task', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  streak: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  totalDays: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
  {
    timestamps: true,
  },
  {
    tableName: 'task'
  }
);

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
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
},
{
  timestamps: false
},
  {
    tableName: 'subtask'
  }
);

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
    allowNull: false,
  },
},
{
  timestamps: true,

},
  {
    tableName: 'log'
  }
);

task.hasMany(subtask, { foreignKey: 'taskId' });
log.belongsTo(subtask, { foreignKey: 'subtaskId' });
subtask.hasMany(log, { foreignKey: 'subtaskId' });
subtask.belongsTo(task, { foreignKey: 'taskId' });
log.belongsTo(subtask, { foreignKey: 'subtaskId' });

module.exports = {
  task,
  subtask,
  log
}

