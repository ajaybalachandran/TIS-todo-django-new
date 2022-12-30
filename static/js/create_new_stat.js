
$(document).ready(function() {
  $('#color_dropdown').change(function (e) { 
    var color = $('#color_dropdown').val();
    console.log(color);
    $("#id_selected_color").html(color);
    $('#clr_badge').css('background-color',color);
    $('#clr_badge').attr('value',color);
  });


  

 


  // $(".color_picker").click(function () {
  //   var c = $(".color_picker").attr('value')
  //   $("#id_selected_color").html(c);

  //   $('#clr_badge').css('background-color',c);
  //   $('#clr_badge').attr('value',c);


   
  // }); 

  
  $("#id_new_status_btn").click(function () {
    $("#myForm").show();
    $("#id_content").css('min-height', 'auto')
   
  });
  $("#new_status_close_btn").click(function () {
    $("#myForm").hide();
    $("#id_content").css('min-height', '100vh')
   
  });
  // $("#color11").click(function () {
  //   $("#id_selected_color").html("Grey");

  //   $('#clr_badge').css('background-color','grey');
  //   $('#clr_badge').attr('value','grey');


   
  // });
  // $("#color12").click(function () {
  //   $("#id_selected_color").html("Orange");
  //   $('#clr_badge').css('background-color','orange');
  //   $('#clr_badge').attr('value','orange');

   
  // });
  // $("#color13").click(function () {
  //   $("#id_selected_color").html("Pink");
  //   $('#clr_badge').css('background-color','pink');
  //   $('#clr_badge').attr('value','pink');


   
  // });
  // $("#color14").click(function () {
  //   $("#id_selected_color").html("Teal");
  //   $('#clr_badge').css('background-color','teal');
  //   $('#clr_badge').attr('value','teal');


   
  // });
  // $("#color15").click(function () {
  //   $("#id_selected_color").html("Black");
  //   $('#clr_badge').css('background-color','black');
  //   $('#clr_badge').attr('value','black');



   
  // });
  // $("#color16").click(function () {
  //   $("#id_selected_color").html("Aqua");
  //   $('#clr_badge').css('background-color','aqua');
  //   $('#clr_badge').attr('value','aqua');



   
  // });
  
  
});

