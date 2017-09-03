const PipeTasks = require("./common/PipeTasks");
PipeTasks(
    [
        {command: "test:electron:debug", main: true, interval: 2000}
    ]
).execute();

