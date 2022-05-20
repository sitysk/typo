var text_canvas = null;
var text_ctx = null;

// 入力しなければならないテキストのリスト
var show_text_list = null;

// 入力した文字列の幅と高さ
var text_width = 20;
var text_height = 70;

// 正解したテキストのリスト
var success_char_list = [];

var input_char_list = [];

// 行
var rows = 0;
// 列
var cols = 0;

var miss_flag= false;

var start_flag = false;

var miss_count = 0;

var end_flag = false;

// ボタンが押されたときのイベント
$(document).keypress(function(event) {
  var charcode = event.which;
  if (charcode == 0) {
    return;
  }
  
  if (end_flag && (charcode == 13 || charcode == 32)) {
    end_flag = false;
    window.location.reload();
  }
  
  if (!start_flag) {
  
    if (charcode == 13 || charcode == 32) {
      Start = new Date();
      start_flag = true;
      myInterval = setInterval("myWatch()",1);
      $('#start_button').css("display", "none");
    }
  
    return;
  }
 
  var input_char = String.fromCharCode(charcode);
  
  if (rows >= show_text_list.length) {
    start_flag = false;
    end_flag = true;
    clearInterval(myInterval);
    alert("終了です\n点数: " + get_score() + " ミス率(%): " + get_miss_average() + " ミス回数: " + miss_count);
    return;
  }
  
  // すでに入力した文字列をプリント
  text_ctx.fillStyle = "green";
  text_ctx.fillText(input_char_list.join(''), 20, text_height, 800);
  
  // 打った文字をプリント
  text_ctx.fillStyle = "red";
  var input_text_length = text_ctx.measureText(input_char_list.join('')).width
  
  // 打った文字をプリントする前に間違った文字を前回打っていた場合消す
  if (miss_flag) {
    text_ctx.clearRect(20 + input_text_length, text_height - 18, 22, 22);
  }
  
  text_ctx.fillText(input_char, 20 + input_text_length, text_height, 800);
  
  // 入力された値と入力しなければならない値をチェック
  var success_char = show_text_list[rows][cols];
  if (success_char == input_char) {
    // 正解していた場合
    input_char_list.push(success_char);
    
    if (!miss_flag) {
      // 黒く塗る
      text_ctx.fillStyle = "black";
      var success_char_length = text_ctx.measureText(success_char_list.join('')).width
      text_ctx.fillText(success_char, 20 + success_char_length, 20 * (rows + 1) * 2 + 10, 800);
      
    }
    miss_flag = false;
    
    success_char_list.push(success_char);
    
    // 行を1つ移す
    cols++;
    
    // TODO 最後の文字を打ったら終わりにしたいな
    
    return;
    
  } else if (success_char == undefined) {
    // 行が終わってしまっていてEnterが押されたときは列を1つ移して初期化
    rows++;
    text_height += 40;
      if (rows >= show_text_list.length) {
        // 列も終わっていたときは終了
        start_flag = false;
        end_flag = true;
        clearInterval( myInterval ); 
        alert("終了です\n点数: " + get_score() + " ミス率(%): " + get_miss_average() + " ミス回数: " + miss_count);
        return;
      }
    cols = 0;
    success_char_list = [];
    input_char_list = [];
    return;
  }
  
  if (success_char != input_char) {
  
    miss_flag = true;
    miss_count++;
    // 入力が間違っていた場合
    var text_length = text_ctx.measureText(success_char_list.join(''))
    
    var success_char_length = 0;
    if (success_char_list.length > 0) {
      text_ctx.fillStyle = "red";
      success_char_length = text_ctx.measureText(success_char_list.join('')).width
    }
    text_ctx.fillText(success_char, 20 + success_char_length, 20 * (rows + 1) * 2 + 10, 800); 
    return;
  }
  
});


