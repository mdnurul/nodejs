const events = require('events');
const emitter= events.EventEmitter;
const util = require('util');

function MyEmitter() {
    emitter.call(this);
}
util.inherits(MyEmitter, emitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', function(){
    console.log('an event occurred!');
});

myEmitter.emit('event');/**
 * Created by bitcanny on 3/14/16.
 */
