var reachdb = require('mongoose');
var Schema = reachdb.Schema;
var tokenSchema = reachdb.Schema({

		key: String,
		value: String,
        used: Boolean,
        usedby: String
	
});


var Reach = reachdb.model('Reach', tokenSchema);
//var Token = mongoose.model('Token', tokenSchema);

module.exports = Reach;