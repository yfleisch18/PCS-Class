const fs = require('fs');


fs.readFile('myName.txt', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        var backwards = '';
        for (var i = data.toString().length; i >= 0; i--) {

            backwards += data.toString().substring(i, i - 1);

        }

        console.log(backwards);
    }
});

console.log('Done');