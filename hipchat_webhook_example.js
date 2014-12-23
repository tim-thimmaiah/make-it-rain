//Test for HipChat hook
//To run, type node hipchat_webhook_example.js

var request = require('request');
var Hipchatter = require('hipchatter');

var hipchat = new Hipchatter(''); //Hipchat Auth Token

var amount = 1000000;
var url = "https://fitztrev.github.io/make-it-rain/gifs.json";

request({
	url: url,
	json: true
}, function (error, response, body) {
	if (!error && response.statusCode === 200) {
		var rand = Math.floor(Math.random()*body.length);
		var gif = body[rand];
        console.log(gif); // Print the json response
        var hipchatMessage = 'Tim' + ' just paid $' + amount + '<br><img src="' + gif + '"/>';

        return hipchat.notify('ToneDen Team', {
            color: 'green',
            message: hipchatMessage,
            notify: true,
            token: ''
        }, function(err) {
            if(err) {
                console.error('Error sending message to Hipchat.');
                console.error(err);
            }
        });
    }
});