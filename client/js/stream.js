navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
window.URL = window.URL || window.webkitURL;

function oldstream(stream) {
  var audio_context = new AudioContext();
  var self=this;
  var recorder;
  var intv;
  var run=false;
  function rec() {
    recorder.record();
    setTimeout(stop,intv);
  }
  function stop() {
    recorder.stop();
    recorder.exportWAV(function(blob) {
      if (self.ondataavailable) self.ondataavailable({data:blob});
    });
    recorder.clear();
    if (run) rec();
  }
  var input = audio_context.createMediaStreamSource(stream);
  recorder = new Recorder(input);
  this.start=function(i) {
    intv=i;
    run=true;
    rec();
  };
  this.stop=function() {
    run=false;
  };
}

function audiostream(cc,ce) {

  var constraints = {audio: true, video: false};
  var recorder;
  var self=this;
  function cpipe(e) {
    if (self.pipe) self.pipe(e);
  }

  function successCallback(stream) {
    //window.stream = stream; // stream available to console
    //recorder=MediaRecorder ? new MediaRecorder(stream,{mimeType: 'audio/webm'}) : new oldstream(stream);
    recorder=new oldstream(stream);
    //recorder.mimeType = 'audio/webm';
    recorder.ondataavailable = cpipe;
    recorder.start(1000);
    console.log(recorder);
    cc();
  }

  function errorCallback(error){
    console.log("navigator.getUserMedia error: ", error);
    ce(error);
  }

  navigator.getUserMedia(constraints, successCallback, errorCallback);
}
