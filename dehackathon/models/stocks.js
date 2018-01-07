const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// create ninja Schema & model
const StocksSchema = new Schema({
    date: {
        type: String
    },
    symbol: {
        type: String
    },
    open: {
        type: Number
    },
    close: {
        type: Number
    },
    low: {
        type: Number
    },
    high: {
        type: Number
    },
    volume: {
        type: Number
    }
    

});

const Stocks = mongoose.model('stocks', StocksSchema);

module.exports = Stocks;
