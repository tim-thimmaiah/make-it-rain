var request = require('request');
var Hipchatter = require('hipchatter');
var Stripe = require('stripe');

var stripe = Stripe(''); //Stripe Secret
var hipchat = new Hipchatter(''); // HipChat Auth Token

var amount = 1000000;

module.exports = function(app) {
	var error = app.settings.error;

	var eventTypes = {
        defaultHandler: function(event, callback) {
            callback();
        },
        'charge.succeded': function(event, callback) {
            var amount = event.data.object.amount;
            var url = "https://fitztrev.github.io/make-it-rain/gifs.json";

            //Easily get the json array
			request({
				url: url,
				json: true
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					//Randomly choose gif
					var rand = Math.floor(Math.random()*body.length);
					var gif = body[rand];

					//Craft HTML message
			        var hipchatMessage = 'A new customer' + ' just paid $' + amount + '<br><br><img src="' + gif + '"/>';

			        return hipchat.notify('Room Name', {
			            color: 'green',
			            message: hipchatMessage,
			            notify: true,
			            token: '' //Hipchat Room Token
			        }, function(err) {
			            if(err) {
			                console.error('Error sending message to Hipchat.');
			                console.error(err);
			            }
			        });
			    }
			});
        },
	}

	return {
		post: function(req,res) {
			stripe.events.retrieve(req.body.id, function(stripeErr,event) {
				if(stripeErr) {
                    console.error('Error getting event from Stripe.');
                    console.error(stripeErr);

                    res.status(404).send('GTFO');
                } else {
                    var webhookHandler = eventTypes[event.type] || eventTypes.defaultHandler;

                    webhookHandler(event, function(err) {
                        var message;

                        if(err) {
                            console.error('Error handling webhook.');
                            console.error(err);

                            message = err;
                        } else {
                            message = JSON.stringify(event);
                        }

                        res.status(200).send('OK');
                    });
                }
			});
		}
	}
};