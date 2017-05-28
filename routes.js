var user = require('./user');

module.exports = {
  configure: function(app) {
    //when a username and password is posted to this url check it
    app.post('/login/', function(req, res) {
      user.login(req.body.username, req.body.password, req, res);
    });
  }
};
