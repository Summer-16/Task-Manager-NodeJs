const { createBackgroundTask } = require('./createTask');

/**
  * @desc task file path that store tasks
*/
const taskList = require('./taskList');

/**
  * @desc This will log the information that task is complete on each iteration
*/
let _onComplete = function (taskName, info) {
  console.log(`${taskName} completed, info: ${info}`) // can be replaced by logger, added in app
}

/**
  * @desc Read list of tasks from taskList file and add those as Background tasks
*/
module.exports.StartPolling = function () {
  try {
    if (taskList) {
      //Here we are adding the tasks one by one mentioned in task list file
      taskList.forEach(task => {
        if (!task.Disabled) {
          const onComplete = task.onComplete ? task.onComplete : _onComplete;
          createBackgroundTask(`${task.name} - Task`, task.interval, task.options, task.action, onComplete);
        }
      });
    } else {
      console.log("Task list does not exists, no tasks are added");
    }
  }
  catch (ex) {
    console.log("ex: ", ex);
  }
}