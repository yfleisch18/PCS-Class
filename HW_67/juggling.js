var http = require('http'),
    bl = require('bl');
var urls = [process.argv[2], process.argv[3], process.argv[4]];
var completed_requests = 0;
var responses = [];
urls.forEach(function (url, index) {
    http.get(url, function (response) {
        response.pipe(bl(function (err, data) {
            if (err) {
                return console.error(err);
            }
            responses[index] = data.toString();
            completed_requests++;
            if (completed_requests === urls.length) {
                printIt();
            }
        }));
    });
});

function printIt() {
    for (var i = 0; i < responses.length; i++) {
        console.log(responses[i]);
    }

}