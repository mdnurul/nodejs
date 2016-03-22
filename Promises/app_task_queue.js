/**
 * Created by bitcanny on 3/17/16.
 */

var recieveFlag = false;
var Promise = require('promise');

var promise = new Promise.resolve;

/*
 var readFile = Promise.denodeify(require('fs').readFile);
 // now `readFile` will return a promise rather than expecting a callback

 function readJSON(filename, callback){
 // If a callback is provided, call it with error as the first argument
 // and result as the second argument, then return `undefined`.
 // If no callback is provided, just return the promise.
 return readFile(filename, 'utf8').then(JSON.parse).nodeify(callback);
 }

 var count = 0;

 readJSON('./cert.json',function(err, data){

 var check = setInterval(function(){
 count++
 if(recieveFlag){
 clearInterval(check);
 console.log('data:',data,'\nerror:',err);
 }else if(count == 5){
 console.log('timeout occured');

 }
 },1000)
 });
 setTimeout(function(){
 recieveFlag = true;
 },6000)
 console.log('data this is test');

 */

var task0 = function (){
    console.log('Task0 completed ...');
};


var task1 = function (){
    console.log('Task1 completed ...');
};


var task2= function (){
    setTimeout(function(){
        recieveFlag = true;
        console.log('Task2 completed ...');
    },3000)
};


var task3 = function (){

    console.log('Task3 completed ...');
};


var task4 = function (){
        setTimeout(function(){
        recieveFlag = true;
        console.log('Task4 completed ...');
    },2000)
};

var task5 = function ( parm ){

    setTimeout(function(){
        recieveFlag = true;
        console.log('Task5 completed ...',parm);
    },6000)


};

var tasks = [
    task0,
    task1,
    task2,
    task3,
    task4
];



tasks.push(task5('hello'));

//tasks[0]();

/*
setInterval(function(){

    console.log('Adding task in the que...');

    tasks.push(task1);

    tasks.push(task3);
},1000);

 */


tasks.forEach(function (task){
    promise = promise.then(function (){
        return task();
    })
});

promise.then(function (){
    console.log("All task Completed...");
});




