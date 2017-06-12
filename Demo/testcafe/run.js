var child_process = require('child_process');
child_process.exec('testcafe chrome test1.js -s ./', {}, function (err, strout, strerr) {
    if (strerr) {
        console.log(strerr)
    } else {
        console.log(strout);
    }
});