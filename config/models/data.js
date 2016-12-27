var bcrypt = require('bcrypt');
var datadb = require('mongoose');
var Schema = datadb.Schema;
var userSchema = datadb.Schema({
		username: String,
        fullname: String,
        password: String,
        phonenumber: String,
        balance: String,
        dbalance: String,
        borrowedbalance: String,
        lastduc: Date,
        email: String,
        power: [],
        tempc: String,
        noofussd: Number,
        noofonline: Number,
        noofrecharge: Number,
        noofnodereq: Number,
        
        transactions: []
        
		
});

userSchema.methods.generateToken = function(){

}
userSchema.methods.generateHash = function(password){
  return	bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

var Data = datadb.model('Data', userSchema);
//var Token = mongoose.model('Token', tokenSchema);
var Models = {Data: Data};
module.exports = Models;
