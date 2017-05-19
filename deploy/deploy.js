
const fs = require('fs');
const fse = require('fs-extra')
const path = require('path');
const child_process = require('child_process');
const rimraf = require('rimraf');

var targetDir = path.join(__dirname, '..', '..', 'default');

var sourceDir = path.join(targetDir, '..');
var sourceClientDir = path.join(sourceDir, 'client');
var sourceServerDir = path.join(sourceDir, 'server');


// clean current directory
console.log('clean ' + targetDir);
//child_process.execSync('git clean -d -x -f', { cwd: targetDir });
var files = fs.readdirSync(targetDir);
files.forEach((f) => {
    if (f != '.git')
    {
        //rimraf.sync(path.join(targetDir, f))
        console.log(path.join(targetDir, f))
    }
});


//child_process.execSync('git clean -d -x -f', { cwd: sourceDir });
//child_process.execSync('git pull', { cwd: sourceDir, stdio:[0,1,2] });

/*
child_process.execSync('npm install', { cwd: sourceClientDir, stdio:[0,1,2] });
child_process.execSync('ng build', { cwd: sourceClientDir, stdio:[0,1,2] });
*/
fse.copySync(path.join(sourceClientDir, 'dist'), path.join(targetDir, 'client', 'dist'));


child_process.execSync('npm install', { cwd: sourceServerDir, stdio:[0,1,2] });
child_process.execSync('tsc', { cwd: sourceServerDir, stdio:[0,1,2] });
fse.copySync(path.join(sourceServerDir, 'out-tsc'), path.join(targetDir, 'server', 'out-tsc'));
fse.copySync(path.join(sourceServerDir, 'package.json'), path.join(targetDir, 'package.json'));
