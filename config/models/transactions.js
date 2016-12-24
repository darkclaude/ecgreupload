var transactionsdb = require('mongoose');
var Schema = transactionsdb.Schema;
var transactionSchema = transactionsdb.Schema({

           username: String,
           phonenumber: String,
           type: String, 
           amount: String,
           dateCreated: Date,
           status: String,
           token : String,
           isOnline: Boolean,
           dateCompleted: Date
	
});


var Transaction = transactionsdb.model('Transaction', transactionSchema);
//var Token = mongoose.model('Token', tokenSchema);

module.exports = Transaction;