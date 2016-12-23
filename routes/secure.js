 var express = require('express');
 var re;
 var pt = 'NOT AVAILABLE';
 var state = 'o';
 module.exports = function(router,app,passport){
router.use(function(req, res, next){
	re = req;

		if(req.isAuthenticated()){
		return next();
	}

	res.redirect('/auth');

});

router.get('/dash', function(req, res){
	//app.use('/dash', express.static(__dirname + '/views'));
	res.render('dash.ejs');
});
router.get('/dashboard', function(req, res){
	console.log(req.session);
	//app.use('/profile', express.static(__dirname + '/views'));
	res.render('dashboard.ejs');
});
     router.get('/borrow', function(req, res){
	//app.use('/dash', express.static(__dirname + '/views'));
	res.render('borrow.ejs');
});
router.get('/transfer', function(req, res){
	console.log(req.session);
	//app.use('/profile', express.static(__dirname + '/views'));
	res.render('transfer.ejs');
});
     router.get('/topup', function(req, res){
	console.log(req.session);
	//app.use('/profile', express.static(__dirname + '/views'));
	res.render('topup.ejs');
});
     router.get('/topupr', function(req, res){
	console.log(req.session);
	//app.use('/profile', express.static(__dirname + '/views'));
	res.render('topupr.ejs');
});
        router.get('/transactions', function(req, res){
	console.log(req.session);
	//app.use('/profile', express.static(__dirname + '/views'));
	res.render('transactions.ejs');
});
router.get('/house', function(req, res){
res.render('house.ejs');
});
router.get('/usage', function(req, res){
res.render('usage.ejs');
});

router.get('/anggetuser', function(req, res){
res.send(req.session.passport.user);
});

//router.get('/403', function(req, res){
//	console.log(req.session);
//	//app.use('/403', express.static(__dirname + '/views'));
//	res.render('na.ejs');
//});


router.post('/value', function(req, res){
res.send(pt);
});


	 router.get('/logout', function(req, res){
req.logout();
res.redirect('/');
	 });




 };
