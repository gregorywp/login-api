var bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://138.68.24.97:27017";
var jwt = require('jsonwebtoken');
var userSecret = 'T9mjPBCY2tfJSSQaNDQAsCFz';

function User() {
	//given username and password return a JSON web token with the users info if username and password match otherwise give a meaningful error message
	this.login = function(username, password, req,res) {
		MongoClient.connect(mongoUrl, function(err, db) {
			if (err) throw err;
			var query = { username: username };
			//get all users with the provided username
			db.collection('users').find(query).toArray(function(err, result) {
				if (err) throw err;
				//if result is empty then there is no user with that name
				if(result.length==0){
					res.send({error: 'No user by that name.'});
				} else {
					bcrypt.compare(password, result[0].password.replace('$2y$','$2a$'), function (err,bverified) {
						if(bverified){
							//let's not send any info about the password just to be safe
							result[0].password = '';
							//return our JSON web token signed by our secret which we will use to verify when the user tries to access data
							res.send({ token : jwt.sign({
										  data: result[0]
										}, userSecret, { expiresIn: 60 * 60 * 24 })
							});
						} else {
							res.send('Password is incorrect');
						}
					});
				}
				db.close();
			});
		});
	};
}
module.exports = new User();