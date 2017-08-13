const PipeTasks = require("./common/PipeTasks");
PipeTasks(
    [
        {command: "test:mock"},
        {command: "test:electron:debug", main: true, interval: 2000}
    ]
).execute();

