window.audio=new audiostream(function() {
  $("#state").html("Thx! lst to yr echo");
},function(e) {
  var et="unkown";
  switch(e.name) {
    case "PermissionDeniedError":
      et="Forbidden";
      break;
  }
  $("#state").html("").append("ERROR: "+et);
});
window.audio.pipe=function(ev) {
  var blob=ev.data;
  var url=URL.createObjectURL(blob);
  var audio=document.getElementsByTagName("audio")[0];
  window.audio=audio;
  audio.src=url;
  console.log(blob,url);
};
