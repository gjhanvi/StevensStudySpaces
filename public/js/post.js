function addRating(elid, rating) {
  el = document.getElementById(elid);
  for(var i = 0; i < 5; i++) {
    if(i >= 5 - rating) {
      el.innerHTML += '<span class="fa fa-star checked"></span>';
    } else {
      el.innerHTML += '<span class="fa fa-star"></span>';
    }
  }
}