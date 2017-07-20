// Modules
var Imap = require('imap');
var inspect = require('util').inspect;
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// // Config
// var webPort = 1337;
// var mongoConnectionString = "mongodb://";
// var publicPath = "/public";
// app.use(express.static('public'));

// // Code
// MongoClient.connect(mongoConnectionString, function(err, db) {
//     server.listen(webPort);

//     io.on('connection', function(socket) {

//         socket.on('mailLogin', function(data) {

//             var imap = new Imap({
//                 user: data.user,
//                 password: data.password,
//                 host: data.host,
//                 port: data.port,
//                 tls: data.tls
//             });

//             imap.once('ready', function() {
//                 imap.end();
//             });

//             imap.once('error', function(err) {
//                 socket.emit("imapLoginError");
//             });

//             imap.once('end', function() {
//                 socket.emit("imapLoginSuccess");
//             });

//             imap.connect();

//         });

//     });
// });

// var imap = new Imap({
//     user: '',
//     password: '',
//     host: 'imap.gmail.com',
//     port: 993,
//     tls: true
// });

// imap.once('ready', function() {

//     console.log("Connected! Loading INBOX...");

//     imap.openBox('INBOX', false, function(err, box) {

//         console.log("INBOX loaded! Searching...");

//         imap.search(["ALL"], function(err, results) {

//             console.log("Search completed! Filtering...");

//             var fetch = imap.fetch(results, {
//                 markSeen: false,
//                 struct: true,
//                 bodies: ['HEADER', 'TEXT']
//             });

//             var mailData = {};
//             var fetchSuccess = true;

//             fetch.on('message', function(mail) {

//                 mailData = {};

//                 console.log("Message found! Parsing...");

//                 mail.on('body', function(stream, info) {
//                     console.log("Incoming info! " + info.which);

//                     var buffer = '';

//                     stream.on('data', function(chunk) {
//                       buffer += chunk.toString('utf8');
//                     });

//                     stream.once('end', function() {

//                         if (info.which == "TEXT") {
//                             mailData.mailBody = buffer;
//                             console.log("Loaded body!");

//                         } else if (info.which == "HEADER") {
//                             buffer = Imap.parseHeader(buffer);
//                             mailData.deliveredTo = buffer["delivered-to"];
//                             mailData.to = buffer["to"];
//                             mailData.from = buffer["from"];
//                             mailData.subject = buffer["subject"];
//                             mailData.threadTopic = buffer["thread-topic"];
//                             mailData.arcAuthResults = buffer["arc-authentication-results"];
//                             mailData.authResults = buffer["authentication-results"];
//                             mailData.return = buffer["return-path"];
//                             console.log("Loaded headers!");
//                         }

//                     });
//                 });

//                 mail.once('attributes', function(attrs) {
//                     mailData.flags = attrs.flags;
//                     console.log("Loaded attributes!");
//                 });

//             });

//             fetch.on('error', function(err) {
//                 fetchSuccess = false;
//                 console.log(err);
//             });

//             fetch.once('end', function() {
//                 if (fetchSuccess) {
//                     console.log("mailData: " + JSON.stringify(mailData));
//                 }
//                 console.log("Ended transaction.");
//                 imap.end();
//             });

//         });

//     });

// });

// imap.once('error', function(err) {
//     console.log("imapLoginError");
// });

// imap.once('end', function() {
//     console.log("imapLoginSuccess");
// });

// console.log("Connecting...");
// imap.connect();
