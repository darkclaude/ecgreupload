

// load all the things we need
var jwt = require('jsonwebtoken');

var LocalStrategy   = require('passport-local').Strategy;

var Data = require('./models/data').Data;
var utmodel = {
         tfulldate: '',
         tdate: '',
         ttime: '',
         ttype: '',
         tamount: '',
};
//var sendgrid  = require('sendgrid')('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');

// expose this function to  our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
console.log('Desilizeing');
    Data.findById(id, function(err, user) {
        console.log('found user');
        console.log(user);
            done(err, user);
        });

        });






    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        var a = req.body.passwordc.length;
        var b = password.length;
        var c =  a+b;

        Data.findOne({ 'username' :  req.body.username }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That User is already taken.'));
            }


            else if(req.body.passwordc!=password){
                return done(null, false, req.flash('signupMessage', ' Password Mismatch! Try Again'));
            }
              else if(req.body.passwordc == password && c<16 ){
                return done(null, false, req.flash('signupMessage', 'Password Too Short 8 characters minimum!'));
;            }
            else {

                // if there is no user with that email
        
               
              var newData = new Data();

                // set the user's local credentials
               
                newData.username =req.body.username;
                newData.email = req.body.email;
                newData.password = newData.generateHash(password);
                newData.phonenumber = req.body.phonenumber;
                newData.fullname = req.body.fullname;
                newDate.transactions.push(utmodel);
                newData.balance = '0.0';
                newData.borrowedbalance='0.0';
                newData.noofussd = 0;
                newData.noofonline=0;
                newData.noofrecharge = 0;
                newData.noofnodereq=0;
               // newData.power.push(0);
              //  newData.transactions.push({date: nil, amount: 50});
                newData.tempc ='0.0';
               
                   newData.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newData);
                });
            }
            

        });

        });

    }));
    
   passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Data.findOne({ 'username' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'User Not Found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }

            // all is well, return successful user
		



    return done(null, user);

        });


    }));







};
