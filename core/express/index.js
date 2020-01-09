const app=global.app=express();
const options = {
  key: fs.readFileSync('testcert/key.pem'),
  cert: fs.readFileSync('testcert/cert.pem')
};
app.use('/', express.static(__dirname + '/../../client'));
const server=global.server=https.createServer(options,app).listen(9980);
server.on("listen",function() {
  mainlog("Server","@",9980);
});
