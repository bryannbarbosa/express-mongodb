const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ppf_unesp', { useMongoClient: true });

mongoose.connection.on('connected',function (err) {  
    console.log('MongoDB is connected');
});

mongoose.connection.on('error',function (err) {
    console.log('MongoDB default connection error: ' + err);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;