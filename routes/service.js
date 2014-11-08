var apns = require('apn');
var fs = require('fs');

module.exports = function (req, res, next){

	if(!req.body.apnMessage || req.body.apnMessage === ''){
		return req.redirect('/');
	}

	var options = {
		cert: fs.readFileSync('./pems/cert.pem'),
		key: fs.readFileSync('./pems/key.pem'),
		gateway: 'gateway.sandbox.push.apple.com',
		port: 2195,
		errorCallback: function (err){ console.log(err); }
	};

	var apnsConnection = new apns.Connection(options);

	var token = "1e07418a10d1394535d86bb159b17614971f4536c0f777c373a5d212486095d2";
	var myDevice = new apns.Device(token);
	var note = new apns.Notification();

	note.badge = 1;
	note.sound = "ping.aiff";
	note.alert = "g0v message test";
	note.payload = {
		'messageFrom': req.body.apnMessage
	};
	note.device = myDevice;

	apnsConnection.sendNotification(note);

	res.redirect('/');
};