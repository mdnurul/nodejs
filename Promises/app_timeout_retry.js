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

 console.log("File Reading Compete... ");
 var Data  = readJSON(CONFIG_FILE,function(err, fdata){

 console.log("File Data:",fdata,"\nError:",err);

 });
 console.log("File data:",Data);
 }

 ReadFile();

 */


function response() {
    //console.log("Response called..");
    setTimeout(function () {
        console.log("Solicated MSG Received...");
        ResponseRecieved_Falg = true;
    }, 4000);

}

function unsoliciated() {

   // console.log("unsoliciated called..");
    setTimeout(function () {
        console.log("Unsoliciated MSG Received...");
        UnsoliciatedRecieved_Falg = true;
    }, 14000);
}

var timeout = 5000;
var cmderr = 0;

function sendZWcommand(responseType, respTimeout, callback) {

    var count = 0;
    var buffProcessFlag = false;
    console.log("Command Issued...");

    var SI = setInterval(function () {
        if (responseType == RespType.soliciated) {
            buffProcessFlag = ResponseRecieved_Falg
        } else {
            buffProcessFlag = UnsoliciatedRecieved_Falg
        }
        if (buffProcessFlag) {
            console.log("Process Recieved data...");
            cmderr = 0;
            UnsoliciatedRecieved_Falg = false;
            callback(cmderr);
            clearInterval(SI);
        } else if (count == respTimeout) {
            console.log("Response Timeout:");
            cmderr = -1;
            UnsoliciatedRecieved_Falg = false;
            callback(cmderr);
            clearInterval(SI);
        }
        count++;
    }, 1);
}


function getBatterystatus() {

    var countTry = 1;
    var MaxReTry = 3;
    var validResponse = false;

    console.log("Get Battery status ....");

    function SendCmdReadResp( ){
        sendZWcommand(RespType.unsoliciated,timeout, function(error){
            if(error == 0){
                console.log("Command Send Response Complete...");
                validResponse = true;
            }else if(error == -1){
                console.log("Command Response TimeOut !");
                validResponse = false;
            }
            console.log("Command called...", countTry, MaxReTry,validResponse);
            if(validResponse != true) {
                if(countTry < MaxReTry){
                    console.log("Command Send Retrying...");
                    setTimeout(SendCmdReadResp, 1);
                } else if(countTry == MaxReTry){
                    console.log("Max Retry count reached. Discarding Command !");
                }
            }else{
                console.log("Get batter request success...");
            }
            countTry++;
        });
    };
    SendCmdReadResp();
}

getBatterystatus();

response();
unsoliciated();











