
var datadb = require('mongoose');
var Schema = datadb.Schema;
var userSchema = datadb.Schema({
		username: String,
        balance: String,
        power: String,
        tempc: String
		
});


var Data = datadb.model('Data', userSchema);
//var Token = mongoose.model('Token', tokenSchema);
var Models = {Data: Data};
module.exports = Models;
