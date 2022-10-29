const sampleTask = require('../tasks/sampleTask');

let tasks = [
  {
    "name": "Sample task to run every 2 sec",
    "interval": "*/2 * * * * *",
    "action": sampleTask,
    "options": {},
    "onComplete": null,
    "disabled": false
  }
];

module.exports = tasks;