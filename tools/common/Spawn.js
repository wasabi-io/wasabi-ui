let { merge } = require("./util/Objects");
let colors = require('colors');

function ExtraParams() {
    
}
// clone the actual env vars to avoid overrides

let injectTaskEnv = (task, spawnMap) => {
    let env = Object.create( process.env );
    spawnMap.env = env;
    if(task.env) {
        for(var key in task.env) {
            env[key] = task.env[key]
        }
    }
    return spawnMap;
};

module.exports = (cmd, parameters, task) => {
    const spawn = require('child_process').spawn;
    if(task.stdio && task.stdio === 'inherit') {
        spawn(cmd, parameters, injectTaskEnv(task, { stdio: 'inherit' }));
        return;
    }
    const command = spawn(cmd, parameters,  injectTaskEnv(task,{ }));
    task.tag = task.tag || task.command;
    command.stdout.on('data', (data) => {
        var dataStr = data.toString();
        if(dataStr.indexOf("error TS") != -1) {
            dataStr = dataStr.red;
        }
        console.log(`${task.tag[task.pColor]}: ` + dataStr);
    });
    command.stderr.on('data', (data) => {
        console.error(`${task.tag[task.pColor]}: ` + data.toString().red);
    });
    command.on('close', (code) => {
        console.log(`${task.tag[task.pColor]}: child process exited with code ${code}`);
        if(task.main) {
            process.exit(code);
        }
    });
};