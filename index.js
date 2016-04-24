pth=require("path");
require('app-module-path').addPath(__dirname);
require("colors");

express=require("express");
socketio=require("socket.io");
path=require("path");
ssocket=require("socket.io-stream");
logger=require("core/log");
os=require("os");
https=require("https");
fs=require("fs");

const l=new logger("main",os.hostname());
const log=global.mainlog=l.log;

log("Init");
require("core/express");
require("core/socket.io");
