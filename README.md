# Make It Rain

Fork of fitztrev's Make It Rain for Node.js + Hipchat

Get a random "make it rain" gif every time you get paid through Stripe.

Works with HipChat.

![screenshot](http://i.imgur.com/g74s4Nm.gif)

## Quick Hipchat Test

Add your HipChat Auth and Room Keys to `hipchat_webhook_example.js`, update your HipChat room name, and run `node hipchat_webhook_example.js` to fire off a sweet gif notification to your room.

## How to use

1) Add/Copy the route outlined in `hipchat_webhook.js` to something like app/routes/webhooks

2) Update it with either your Hipchat API info (see below)

3) Add a webhook to [your Stripe account](https://dashboard.stripe.com/account/webhooks)

    https://YOUR_SITE_HERE.com/make-it-rain/webhook.php?secret=abc123

* Your `secret` is set in `hipchat_webhook.js` and known only to Stripe so nobody can ping that URL and give you a false notification.

#### For Hipchat

1. Go to <https://hipchat.com/admin/rooms>
2. Click your room and copy "API ID" to the channel setting in `hipchat_webhook.js`
3. In "Tokens" for that room, create a token with label "Just got paid" and copy it to `hipchat_webhook.js`

### For Slack

Sorry don't use slack, but I'll welcome a Slack update pull request.

## Contributing gifs

New gifs are welcomed and encouraged. Check the [existing ones](https://github.com/fitztrev/make-it-rain/tree/gh-pages), grab the [`gh-pages`](https://github.com/fitztrev/make-it-rain/tree/gh-pages) branch of this repo, and submit a pull request to add one.
