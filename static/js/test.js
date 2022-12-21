// function ajay(){
//   document.getElementById('data').innerHTML='<input type="text" placeholder="Middle Name" id="id_mname">';
// }



// $(document).ready(function() {
//   $('input[type="checkbox"]').click(function() {
//       var inputValue = $(this).attr("value");
//       $("." + inputValue).hide();
//   });
  
// });


// this is for home.html
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
  // $("#note_create_btn").click(function () {
  //   $("#popupForm").css('position', 'relative');

  //   $("#popupForm").css('display', 'none');


  // });
  
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

function btnchange2() 
{
    var elem = document.getElementById("myButton2");
    var badge = document.getElementById("badge2");
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



  function taskNotePopup() {
    document.getElementById("popupForm").style.display = "block";
    // document.getElementById("popupForm").style.position = "fixed";
    // document.getElementById("popupForm").style.top = "200px";

    // document.getElementById("popupForm").style.left = "100px";

  }
  function submitfunction() {
    // document.getElementById("popupForm").style.position = "relative";
    document.getElementById("popupForm").style.display = "none";
    var value1 = document.getElementById('note').value
    console.log(typeof(value1));
    if (value1.length<30){
      document.getElementById('task_note').innerText=value1
    }
    else{
      var output = ""
    for(let char of value1){
      output += char
      if (output.length==30){
        const para = document.createElement("p");
        para.innerText = output;
        // document.body.appendChild(para);
        document.getElementById('task_note').appendChild(para)
        output = ''
      }
    }
    }
    
    

  }
  function closeForm() {
    // document.getElementById("popupForm").style.position = "relative";
    document.getElementById("popupForm").style.display = "none";
    
  }



