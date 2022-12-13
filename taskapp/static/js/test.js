// function ajay(){
//   document.getElementById('data').innerHTML='<input type="text" placeholder="Middle Name" id="id_mname">';
// }



// $(document).ready(function() {
//   $('input[type="checkbox"]').click(function() {
//       var inputValue = $(this).attr("value");
//       $("." + inputValue).hide();
//   });
  
// });

$(document).ready(function() {
  $("#test1").click(function () {
    if ($(this).is(":checked")) {
        $("#first_right").show();
        $("#first_left").hide();

    } else {
        $("#first_right").hide();
        $("#first_left").show();

    }
  });

  $("#test2").click(function () {
    if ($(this).is(":checked")) {
        $("#second_right").show();
        $("#second_left").hide();
    } else {
        $("#second_right").show();
        $("#second_left").hide();
    }
  });

  $("#test3").click(function () {
    if ($(this).is(":checked")) {
      $("#third_right").show();
      $("#third_left").hide();

    } else {
        $("#third_right").show();
        $("#third_left").hide();
    }
  });

  $("#test4").click(function () {
    if ($(this).is(":checked")) {
        $("#fourth_right").show();
        $("#fourth_left").hide();
    } else {
        $("#fourth_right").show();
        $("#fourth_left").hide();
    }
  });

  $("#new_task_btn").click(function () {
    $("#new_task_data").css('display', 'block');
    $("#top-left").css('min-height', 'auto');
    $("#top-right").css('min-height', 'auto');

  });
  $("#cancel_newtask").click(function () {
    $("#new_task_data").css('display', 'none');
    $("#top-left").css('min-height', '100vh');
    $("#top-right").css('min-height', '100vh');


  });
  
  
});

function btnchange() 
{
    var elem = document.getElementById("myButton1");
    var badge = document.getElementById("badge1");
    if (elem.value=="New"){
      elem.value = "Partially completed";
      badge.style.background = "yellow";
    } 
    else if (elem.value=="Partially completed"){
      elem.value = "Completed";
      badge.style.background = "green";

    } 
    else if (elem.value=="Completed"){
      elem.value = "Canceled";
      badge.style.background = "red";

    } 
    else{
      elem.value = "New";
      badge.style.background = "#0d6efd";

    } 
}

