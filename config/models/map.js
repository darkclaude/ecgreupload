
var mapdb = require('mongoose');
var Schema = mapdb.Schema;
var userSchema = mapdb.Schema({

		username: String,
        lat: String,
        lng: String
		
});


var Data = mapdb.model('Map', userSchema);
//var Token = mongoose.model('Token', tokenSchema);
var Models = {Data: Data};
module.exports = Data;
