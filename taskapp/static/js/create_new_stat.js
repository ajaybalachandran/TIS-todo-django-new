
$(document).ready(function() {
  
  $("#id_new_status_btn").click(function () {
    $("#myForm").show();

   
  });
  $("#new_status_close_btn").click(function () {
    $("#myForm").hide();

   
  });
  $("#color11").click(function () {
    $("#id_selected_color").html("Grey");
    $('#clr_badge').css('background-color','grey');

   
  });
  $("#color12").click(function () {
    $("#id_selected_color").html("Orange");
    $('#clr_badge').css('background-color','orange');

   
  });
  $("#color13").click(function () {
    $("#id_selected_color").html("Pink");
    $('#clr_badge').css('background-color','pink');

   
  });
  $("#color14").click(function () {
    $("#id_selected_color").html("Teal");
    $('#clr_badge').css('background-color','teal');

   
  });
  $("#color15").click(function () {
    $("#id_selected_color").html("Black");
    $('#clr_badge').css('background-color','black');


   
  });
  $("#color16").click(function () {
    $("#id_selected_color").html("Aqua");
    $('#clr_badge').css('background-color','aqua');


   
  });
  
  
  
});

