// Modules
var Imap = require('imap');
var inspect = require('util').inspect;
// var MongoClient = require('mongodb').MongoClient;
// var express = require('express');
// var app = express();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

// // Config
// var webPort = 1337;
// var mongoConnectionString = "mongodb://";
// var publicPath = "/public";
// app.use(express.static('public'));

// // Code

// MongoClient.connect(mongoConnectionString, function(err, db) {
//     server.listen(webPort);

//     io.on('connection', function (socket) {

//     });
// });

var imap = new Imap({
  user: '',
  password: '',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});

imap.once('ready', function() {

    console.log("Connected! Loading INBOX...");

    imap.openBox('INBOX', false, function(err, box) {

        console.log("INBOX loaded! Filtering...");

        var filter = imap.seq.fetch("*", {
            markSeen: false,
            struct: true,
            bodies: ''
        });

        filter.on('message', function(mail) {

            console.log("Message found! Parsing...");

            mail.on('body', function(stream, info) {

                var buffer = '';

                stream.on('data', function(chunk) {
                  buffer += chunk.toString('utf8');
                });

                stream.once('end', function() {
                  console.log("Loaded body! I cannot really log it yet though...");
                });
            });

            mail.once('attributes', function(attrs) {
                console.log("Loaded attributes! I cannot really log it yet though...");
            });

        });

        f.once('end', function() {

            console.log("Completed All Messages");
            imap.end();

        });

    });

});

console.log("Connecting...");
imap.connect();
