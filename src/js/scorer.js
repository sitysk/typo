// 分速何文字かをそのまま点数にしてミスの回数で減点して行く

var get_score = function() {


  var time = 0;

  time += sec_time / 60

  time += msec_time / 1000 / 60

  var score = text_count / time;

  var level = $('input[name="level"]:radio:checked');
  if (level.val() == "easy") {
    score = score - (miss_count * 5);
  
  } else if (level.val() == "hard") {
    score = score - (miss_count * 50);
  } else {
    score = score - (miss_count * 20);
  }

  if (score < 0) {
    score = 0;
  }
  return Math.floor(score);

};

var get_miss_average = function() {
  var miss_average = miss_count / text_count * 100;

  return Math.floor(miss_average);

}

