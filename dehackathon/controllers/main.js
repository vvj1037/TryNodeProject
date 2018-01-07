

module.exports = function(app){

	app.get('/hello',function(req,res){
		console.log("reached!");
		res.render("hello");
	});

	app.get('/testget',function(req,res){
		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/mydb";

		MongoClient.connect(url, function(err, dab) {

		  if (err) throw err;
		  //var query = {};
		  const db1 = dab.db('mydb')
		  db1.collection("stocks").findOne({}, function(err, result){
		    if (err) throw err;
		    res.render("records",{x:result});
		    console.log(result);
		    dab.close();
		  });
		});
		
	});

	app.post('/realtime',function(req,res){
		const Stocks = require('../models/stocks');
		console.log("POST request")
		var data = req.body
		console.log("request body::")
		console.log(data.ticker)
		var AlphaVantageAPI = require('alpha-vantage-cli').AlphaVantageAPI;

		var yourApiKey = 'H7E37Y70176EPNPV';
		var alphaVantageAPI = new AlphaVantageAPI(yourApiKey, 'compact', true);

		alphaVantageAPI.getDailyData(data.ticker)
		    .then(dailyData => {
		        console.log("Daily data:");
		        console.log(dailyData[0]);
		        var temp = {}
		        temp.date = dailyData[0].Timestamp
		        temp.symbol = data.ticker
		        temp.open = dailyData[0].Open
		        temp.close = dailyData[0].Close
		        temp.low = dailyData[0].Low
		        temp.high = dailyData[0].High
		        temp.volume = dailyData[0].Volume
		        console.log(temp);
		        Stocks.create(req.body).then(function(stocks){
			        console.log("Successfull insertion")
			        console.log(stocks)
			    })

		    })
		    .catch(err => {
		        console.error(err);
		    });
		res.render("hello");

	});

}