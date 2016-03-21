/**
 * Created by Md Nurul on 3/21/2016.
 */

var Promise = require('promise');

var CONFIG_FILE = './files/tsconfig.json';

var ResponseRecieved_Falg = false;
var UnsoliciatedRecieved_Falg = false;

var RespType = {
    unsoliciated: 0,
    soliciated: 1

};

/*
var readFile = Promise.denodeify(require('fs').readFile);
// now `readFile` will return a promise rather than expecting a callback


function readJSON(filename, callback){
    // If a callback is provided, call it with error as the first argument
    // and result as the second argument, then return `undefined`.
    // If no callback is provided, just return the promise.

    var config = readFile(filename, 'utf8').then(JSON.parse).nodeify(callback);
    console.log("Test File :",config);
    return config;//readFile(filename, 'utf8').then(JSON.parse).nodeify(callback);
}

function ReadFile(){

    var Data  = readJSON(CONFIG_FILE,response);
    console.log("File data:",Data);
}

ReadFile();

 */

function response( ){

    console.log("File Reading Compete... ");
    setTimeout(function(){
        ResponseRecieved_Falg = true;
    },4000);

}

function unsoliciated(){

    setTimeout(function(){
        UnsoliciatedRecieved_Falg = true;
    },15000);

}

var timeout = 5000;
var cmderr = 0;

function sendZWcommand(responseType, respTimeout){


    var count = 2;

    var buffProcessFlag = false;


    var SI = setInterval(function(){
        if(responseType == RespType.soliciated){
            buffProcessFlag = ResponseRecieved_Falg
        }else{
            buffProcessFlag = UnsoliciatedRecieved_Falg
        }

        if(buffProcessFlag){
            console.log("Response Recieved process:");
            cmderr  = 0;
            clearInterval(SI);
        }else if (count == respTimeout){
            console.log("Response Timeout:");
            cmderr  = -1;
            clearInterval(SI);
        }
        count++;
    },1);

    return cmderr;

}



//sendZWcommand(RespType.unsoliciated,timeout);

function getBatterystatus(){

    var reTryCount = 3;
    var count = 0;

    var sendSI =  setInterval(function(){
        console.log("Sendng Command ...");
        var err = sendZWcommand(RespType.unsoliciated,timeout);

        if(err == 0){
            console.log("Command Send Response Complete  ...");
            clearInterval(sendSI);
        }else if(err == -1){
            console.log("Command Send Response TimeOut, Retrying...");
            count++
        }else if(count == reTryCount){
            console.log("Discarding Command...");
            clearInterval(sendSI);
        }


    },timeout+1000);



}

getBatterystatus();

response();
unsoliciated();











