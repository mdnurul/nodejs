/**
 * Created by bitcanny on 1/29/16.
 */

/*
var events = require("events");
var Emitter = events.Emitter;
var ee = new Emitter();
var userObj = "Param data"

ee.on("new-user", function (data) {
    console.log("event has occured, Data: ",data);
});

//ee.emit("someEvent");
ee.emit("new-user", userObj);
 */

var amzIOT = require('./amazon/services/iot/amazon_iot.js');


console.log('Hello World. This is Event test...');

var amziot = new  amzIOT("prm1", "prm2");

amziot.on('event',function(result){

    console.log('Hi there event has been called !.. have fun',result);

});

amziot.iotServiece();



