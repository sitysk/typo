

//var text_list = ["aaa"]

var created_show_text_list = null;

var text_count = 0;

var create_text = function() {
  text_count = 0;
  var temp_text_list = new Array();
  created_show_text_list = new Array();
  var index = 1;
  var text_length = 0;

  // 設定されてる単語をランダムに取得する
  //  TODO 単語数をどうしようかな？
  var count = $('input[name="count"]:radio:checked');
  var count_num = 0;
  if (count.val() == '50') {
    count_num = 50;
  } else if(count.val() == '100') {
    count_num = 100;
  } else {
    count_num = 10;
  }
  
  for (var i = 0; count_num > i; i ++) {
    var randnum = Math.floor( Math.random() * 1476 );
    var text = text_list[randnum]
    
    text_count += text.length;
    
    // テキストの長さ * テキストの大きさ + ホワイトスペース分
    
    text_length += text_ctx.measureText(text).width
    
    
    if  (text_length > 650) {
      index = 1;
      created_show_text_list.push(temp_text_list.join(' '));
      text_length = text_ctx.measureText(text).width;
      
      temp_text_list = new Array();
      temp_text_list.push(text);
    } else {
      temp_text_list.push(text);
    }

  };
  created_show_text_list.push(temp_text_list.join(' '));
  return created_show_text_list;
};


var get_text_count = function() {

  var text_length = 0;
  
  for (var i = 0; created_show_text_list.length > i; i++) {
  
    text_length += created_show_text_list[i].length;
  
  }
  
  return text_length;

};

// ページが読み込まれたとき
onload = function() {
  set_text();
  $('input[name="count"]').change(function() {
    set_text();
    
  });
};


var set_text = function() {
  var count = $('input[name="count"]:radio:checked');
  var count_num = 0;
  if (count.val() == '50') {
    $('#canvassample').attr('height', '300');
  } else if(count.val() == '100') {
    $('#canvassample').attr('height', '500');
  } else {
    $('#canvassample').attr('height', '200');
  }
  
  // 入力文字列を設定する
  text_canvas = document.getElementById('canvassample');
  text_ctx = text_canvas.getContext('2d');
  text_ctx.font = "bold 20px 'ＭＳ ゴシック'";
  text_ctx.fillStyle = "gray";
  
  show_text_list = create_text();
  for (var i = 0; show_text_list.length > i; i++) {
    
    text_ctx.fillText(show_text_list[i], 20, 20 * (i + 1) * 2 + 10, 800);
  }
  
  //text_count = get_text_count(); 
  
  
}

