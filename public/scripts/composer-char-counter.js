$(document).ready(function() {
  // --- our code goes here ---
  let count;
  $(".text-box").on("keyup", function(){
    count = 140 - this.value.length;
    $(this).siblings(".counter").html(count);
    if (count < 0) {
      $(this).siblings(".counter").addClass("tooLong");
    } else {
      $(this).siblings(".counter").removeClass("tooLong");
    }
  console.log(count);
  });
});

