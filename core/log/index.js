const fs=require("fs");
const ws=fs.createWriteStream("./latest.log");
function logger(first,second) {

  var tabs={time:3,first:1,second:3};
  var colors={time:"white",first:"blue",second:"yellow"};
  var sayc={error:"red",log:"white",warn:"yellow"};
  /*var mainc=function() {
    return {log:function(e,e2) {
      console.error("FATAL".bgRed,e.red,e2.red);
    }};
  };
  var main=new mainc();*/

  function tabdo(str,max) {
    if (typeof str!=="string") str="unkown".red;
    t=max-Math.floor(str.length/8);
    for (var i = 0; i < t; i++) {
     str=str+"\t";
    }
    return str;
  }

  function time() {
    function checkTime(i) {if (i < 10) i="0"+i;return i;}
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var d = today.getDate();
    var M = today.getMonth() + 1;
    var y = today.getFullYear();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    d = checkTime(d);
    M = checkTime(M);
    var ttime=d+"."+M+"."+y+"  "+h + ":" + m + ":" + s;
    return ttime;
  }

  function base() {
    var a={time:time(),first:first,second:second},i,s="";
    for (var p in a) {
      i=a[p];
      s=s+tabdo(i,tabs[p])[colors[p]];
    }
    return s;
  }

  function idup(id) {
    third=id;
  }

  function say(text,type) {
    if (!type) type="log";
    if (!sayc[type]) sayc[type]="white";
    text=(type.toUpperCase()+"\t")[sayc[type]]+text;
    /*fs.appendFile("./latest.log",text+"\n",function(err) {
      if (err) main.log("log append error",err);
    });*/
    ws.write(text+"\n");
    console[type](text);
  }

  function crash() {
    var text=time()+"\t";
    for (var i = 0; i < arguments.length; i++) {
     text=text+arguments[i].toString()+"\t";
    }
    say(text.red,"error");
  }

  function logc(type) {
    return function() {
      var text="";
      if (arguments) {
        for (var i = 0; i < arguments.length; i++) {
         if (arguments[i]) text=text+arguments[i].toString()+"\t";
        }
      }
      text=base()+text;
      say(text,type);
    };
  }

  return {log:logc("log"),error:logc("error"),warn:logc("warn"),idup:idup,crash:crash};
}
module.exports = logger;
