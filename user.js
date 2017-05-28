function User() {
  this.login = function(username, password, req,res) {
    res.send('test');
  };
}
module.exports = new User();