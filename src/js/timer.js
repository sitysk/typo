
var Start = null;
var Stop = null;
var sec_time = 0;
var msec_time = 0;

// ストップウォッチ
var myWatch = function(){
  if (!start_flag){ 
    Start = new Date();
    start_flag = true;
    myInterval = setInterval("myWatch()",1);
    $('#start_button').css("display", "none");
  } else { 

    Stop=new Date();
    var T = Stop.getTime() - Start.getTime();
    var H = Math.floor(T/(60*60*1000));
    var T = T-(H*60*60*1000);
    var M = Math.floor(T/(60*1000));
    var T = T-(M*60*1000);
    sec_time = Math.floor(T/1000); 
    msec_time = T%1000; 
    $('.sec').text(sec_time);
    $('.msec').text(msec_time);
  }
}