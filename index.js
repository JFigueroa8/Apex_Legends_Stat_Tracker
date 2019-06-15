const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'static')));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

let uri = 'https://public-api.tracker.gg/v1/apex/standard/profile/';
// https://public-api.tracker.gg/v1/apex/standard/profile/{platform}/{platformUserIdentifier}
// Platforms: origin, xbl, psn
// TRN-Api-Key: 0209bbf9-c028-4506-a4a4-6c132926b22f

app.post('/', function(req, res) {
    // console.log(req.body);
    request.get(uri + req.body.dropDownValue + '/' + req.body.platformUserIdentifier, {
        headers : {
            'TRN-Api-Key': '0209bbf9-c028-4506-a4a4-6c132926b22f'
        }
    }, function(error, response, body) {
            // console.log(body);
            res.json(body);
        });
});

let port = process.env.PORT || 3000;
app.listen(port);