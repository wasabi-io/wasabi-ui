const PackageUtil = require("./PackageUtil");
const Spawn = require("./Spawn");

var colors = [
    "black",
    "red",
    "green",
    "yellow",
    "blue",
    "magenta",
    "cyan",
    "white",
    "gray",
    "grey"
];

function getRandomColor() {
    var min = Math.ceil(0);
    var max = Math.floor(colors.length - 1);
    var rand = Math.floor(Math.random() * (max - min)) + min;
    return colors[rand];
}

const spawn = function (task, taskConf) {
    if (task.interval) {
        setTimeout(function () {
            Spawn(
                taskConf.command,
                taskConf.parameters,
                task
            );
        }, task.interval);
    } else {
        Spawn(
            taskConf.command,
            taskConf.parameters,
            task
        )
    }
};

const PipeTasks = function (tasks) {
    var spawns = [];
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        var taskConf = PackageUtil.getSpawnParameters(task.command);
        task.pColor = task.pColor || getRandomColor();
        spawns.push(function (props) {
            spawn(task, taskConf)
        })
    }

    return {
        execute: function (props) {
            for (var i = 0; i < spawns.length; i++) {
                spawns[i](props);
            }
        }
    }
};

module.exports = PipeTasks;
