const CronJob = require('cron').CronJob;
const runningTask = [];

/**
 * @desc - Create the background task 
 * @param {string} taskName - Name of the Task
 * @param {string} time - Use the cron time format like * * * * * *
 * @param {object} info - Object that have the information that need to be pass in action function
 * @param {function} action - Function that will be called from task based on time
 * @param {function} onComplete - Function that will be called when task completed
 */
function createBackgroundTask(taskName, time, info, action, onComplete) {
  const task = new CronJob(time,
    function (callback) {
      const options = Object.assign({}, info);
      action(taskName, options);
    }, onComplete, true);
  task.start();
  runningTask.push({ taskName: taskName, info: info, task: task });
}

/**
 * @desc - Stop the background task based on name 
 * @param {string} taskName - Task name that need to be stop
 */
function stopBackgroundTask(taskName) {
  const filterTask = runningTask.filter(task => { return taskName === task.taskName; });

  if (filterTask && filterTask.length !== 0) {
    filterTask[0].task.stop();
    runningTask = runningTask.filter((item) => taskName !== item.taskName);
  }
}

function getRunningTask() {
  return runningTask;
}

module.exports = {
  createBackgroundTask,
  stopBackgroundTask,
  getRunningTask
}