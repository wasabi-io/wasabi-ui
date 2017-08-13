const PipeTasks = require("./common/PipeTasks");
PipeTasks(
    [
        {command: "test:electron", main: true, interval: 2000}
    ]
).execute();

