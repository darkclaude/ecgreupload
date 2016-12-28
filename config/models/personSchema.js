
var persondb = require('mongoose');
var Schema = persondb.Schema;
var userSchema = persondb.Schema({
        name: String,
        email: String,
        address: String,
        phonenumber: String,
        provider: String,
        premium: Boolean,
        activated: Boolean,
        won: String,
        firstimebonus: Boolean,
        uniqueid: String,
        token: String,

});


var Data = persondb.model('Person', userSchema);
//var Token = mongoose.model('Token', tokenSchema);
var Models = {Data: Data};
module.exports = Models;
