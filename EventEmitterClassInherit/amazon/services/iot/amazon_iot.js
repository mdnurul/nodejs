/**
 * Created by bitcanny on 1/29/16.
 */

const eventEmitter = require('events').EventEmitter;
const util = require('util');

var self;



var AmazonIOT = function(c1, c2){
    this.c1 = c1;
    this.c2 = c2;
    self = this;
    var selfInternal = this;
    eventEmitter.call(this);
    test(selfInternal);
};

util.inherits(AmazonIOT, eventEmitter);
//const myEmitter = new AmazonIOT();

/*
AmazonIOT.prototype = {
    //__proto__: eventEmitter.prototype,

    iotServiece : function() {
        //setTimeout(function(){self.emit('event',{value: 'hello there'});},5000);
        //self.emit('event', {value: 'hello there'});

        console.log('IOT service has been called !');
    }
};
 */

AmazonIOT.prototype.iotServiece = function(){

    console.log('IOT service has been called !');
};



//setTimeout(function(){this.emit('event',{value: 'hello there'});},5000);

function test( selfINtrnal){
    selfINtrnal.emit('event',{value: 'hello there'});
    console.log('Constructore init...');
};

module.exports = AmazonIOT;
