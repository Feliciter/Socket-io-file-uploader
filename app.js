var siofu = require("socketio-file-upload");
const serve = require("express-static");
var express = require("express");

var app = require("express")().use(siofu.router);
var http = require("http").Server(app);
var io = require("socket.io")(http);
var path = require("path");
var mime = require("mime-types");

var parser = require("ua-parser-js");
var fs = require("fs");

var moment = require("moment");
moment().format();
var now = moment();

var dateFormat = require("dateformat");
var parseFormat = require("moment-parseformat");
var pathtolog = "logs";
var pathtoupload = "uploads";

let dirCont = fs.readdirSync(__dirname + "/" + pathtoupload);
let file = __dirname + "/" + pathtoupload + "/" + dirCont[0];

var datetime; // = "15/Feb/2015:06:38:22 +0200";
var iphost; // = "194.135.154.57";
var useragent; // = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:37.0)";
var stateNew = 0;
var getJson; //='JSON: { type: "test", query: "node js development" }';
var getRAW; //= "RAW: Test here!";
var getImage; //; //='Image: localhost:8080/files/1.png';

require("events").EventEmitter.defaultMaxListeners = 4;

app.use("/static", express.static(__dirname + "/publicfiles"));

app.get("/", function(req, res, next) {
  res.sendFile(__dirname + "/publicfiles/index.html");

  //console.log(req.headers);

  // get ip
  iphost = JSON.stringify(req.headers.host).replace(/"*/g, "");
  console.log(iphost);

  // get useragent
  useragent = JSON.stringify(req.headers["user-agent"])
    .replace(/A[\s\S]*/g, "")
    .replace(/"*/g, "");
  console.log(useragent);

  //get datetime
  datetime = now.format("DD/MMM/YYYY:h:mm:ss +0200");
  console.log(datetime);

  //to log
  writeLog(datetime, iphost, useragent, (stateNew = 1));
});

io.on("connection", function(socket) {
  console.log("new  user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    console.log("message: " + msg);
  });
});

//
io.on("connection", function(socket) {
  var siofuServer = new siofu();
  siofuServer.on("saved", function(event) {   

          (event.file.clientDetail.base = event.file.base),
      // console.log(dirCont)
      //getTypeFile(event.file.name)

      getContentFile(event.file.name);
  });

  siofuServer.on("error", function(data) {
    console.log("Error: " + data.memo);
    console.log(data.error);
  });
  siofuServer.on("start", function(event) {
    if (/\.exe$/.test(event.file.name)) {
      console.log("Aborting: " + event.file.id);
      siofuServer.abort(event.file.id, socket);
    }
  });
  siofuServer.dir = "uploads";
  siofuServer.maxFileSize = 20000;
  siofuServer.listen(socket);
});
//

http.listen(3000, function() {
  console.log("listening on *:3000");
});

function writeLog(
  datetime,
  iphost,
  useragent,
  stateNew,
  getJson,
  getRAW,
  getImage
) {
  if (stateNew === 1) {
    //console.log(stateNew);
    var MSG = `[${datetime}] ${iphost} ${useragent} New connection \n `;
  }

  if (getJson) {
    //console.log("getJson" + getJson);
    var MSG = `[${datetime}] ${iphost} ${useragent} New ${getJson} \n `;
  }

  if (getRAW) {
    //console.log("getRAW " + getRAW);
    var MSG = `[${datetime}] ${iphost} ${useragent} New ${getRAW} \n `;
  }

  if (getImage) {
    //console.log("getImage" + getImage);
    var MSG = `[${datetime}] ${iphost} ${useragent} New ${getImage} \n `;
  }

  fs.appendFile(
    pathtolog + "/" + "log.log",
    MSG,

    function(err) {
      if (err) throw err;
      //console.log("FILE log Saved!");
    }
  );

  return;
}


function getContentFile(typefile) {
  if (typefile.match(/json$/i) == "json") {
    getContJson = JSON.parse(
      fs.readFileSync(__dirname + "/" + pathtoupload + "/" + typefile, "utf8")
    );

   
    var arr=[]
    var mod_arr    
    for (key in  getContJson) {
        if ( getContJson.hasOwnProperty(key)) {       
          arr.push( key+':'+  getContJson[key] ) 
        }
        
    } 
    getJson='Json '+  ' { '+arr +' } '
   
    
    writeLog(datetime, iphost, useragent, (stateNew = 0), getJson);
    return copyIMGtoPubic(typefile);
  }

  if (typefile.match(/txt$/i) == "txt") {
    getRAW = fs.readFileSync(
      __dirname + "/" + pathtoupload + "/" + typefile,
      "utf8"
    );

    //console.log(getRAW);
    writeLog(datetime, iphost, useragent, (stateNew = 0), getRAW);
    return copyIMGtoPubic(typefile);
  }

  return;
}

// перенос обработанных
function copyIMGtoPubic(typefle) {
  var currentpath = __dirname + "/" + pathtoupload + "/" + typefle;

  fs.rename(
    currentpath,
    __dirname + "/" + "files" + "/" + "parsed" + "/" + typefle,
    function(err) {
      if (err) console.log("ERROR: " + err);
    }
  );
  return;
}
