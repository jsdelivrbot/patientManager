var express  = require('express');
var config = require("./config");
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
const Nexmo = require("nexmo");

// Configuration
mongoose.connect(config.database);
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Models
var Patients = mongoose.model('Patients', {
  patientName: String,
  areacode: Number,
  telnumber: String
});
 
// Routes
 
    // Get reviews
    app.get('/api/patients', function(req, res) {
 
        console.log("fetching patients");
 
        // use mongoose to get all reviews in the database
        Patients.find(function(err, patients) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(patients); // return all patients in JSON format
        });
    });

    app.get('/api/areacodes', function(req, res) {
        Patients.distinct("areacode", (function(err, patients) {
            if (err)
                res.send(err)
            res.json(patients);
        }));
    });
 
    // create review and send back all reviews after creation
    app.post('/api/patients', function(req, res) {
 
        console.log("creating a patient");
 
        // create a review, information comes from request from Ionic
        Patients.create({
          patientName : req.body.patientName,
            areacode : req.body.areacode,
            telnumber: req.body.telnumber
        }, function(err, patients) {
            if (err)
                res.send(err);
 
            // get and return all the reviews after you create another
            Patients.find(function(err, patient) {
                if (err)
                    res.send(err)
                res.json(patient);
            });
        });
 
    });
 
    // delete a review
    app.delete('/api/patients/:patient_id', function(req, res) {
        Patients.remove({
            _id : req.params.patient_id
        }, function(err, patient) {
 
        });
    });

    app.post('/api/smspatients', function(req, res) {
        console.log(req.body);
        const nexmo = new Nexmo({
            apiKey: "4c71cae1",
            apiSecret: "RmpMpZ7Y2GrzpjnJ"
          });
        var patientlist = new Array();
        var query = { areacode: req.body.areacode };
        Patients.find(query, (function(err, patients) {
            if (err)
                res.send(err)
            console.log(patients);
            patients.forEach(element => {
                nexmo.message.sendSms(
                    "94770177440",
                    element.telnumber,
                    req.body.msg,
                    { type: "unicode" },
                    (err, responseData) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(responseData);
                    }
                    }
                );
            });
        }));

    });
 
 
// listen (start app with node server.js) ======================================
app.listen(config.port, function(err, res) {
  if (!err) {
    console.log("Running on port:" + config.port);
  }
});
