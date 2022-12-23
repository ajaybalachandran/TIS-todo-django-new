// this js file is for home.html

$(document).ready(function() {
  
  //form submission without page refresh (file upload working perfectly)

  $(document).on('submit', '#create_new_task_form', function(e){
    e.preventDefault();

    console.log('form submitted');
    
    var task_name = $("#task_name").val();
    var description = $("#task_desc").val();
    var cats = $("#task_cat").val();

    // var task_image = $("#task_image").val();

    var needed_time = $("#task_avail_time").val();
    var token =  $('input[name=csrfmiddlewaretoken]').val();
    
    var data = new FormData();
    data.append("file", $("input[id^='task_image']")[0].files[0])
    data.append("csrfmiddlewaretoken", token)
    data.append("task_name", task_name)
    data.append("description", description)
    data.append("cats", cats)
    data.append("needed_time", needed_time)
    console.log(task_name, description, cats, needed_time, token);


    $.ajax({
      url: "/todo/home/",
      method: "POST",
      processData: false,
      contentType: false,
      mimeType: "multipart/form-data",
      data: data,
      success: function(data){
        console.log('Data send to the backend');
        $("#create_new_task_form")[0].reset();
        $("#new_task_data").css('display', 'none');
        $("#top-left").css('min-height', '100vh');
        $("#top-right").css('min-height', '100vh');
        $.ajax({
          type: 'GET',
          url: '/todo/home/test/',
          success: function(response){
            console.log(response);
            $("#display-data").empty();

            
    
            for(var key in response.pending_tasks){
              arr_len = response.pending_tasks.length
              if(key==arr_len-1){
                console.log(response.pending_tasks.length);
                var section = '<ol class="list-group mb-3 v1" id='+response.pending_tasks[key].id+'>'+
                '<li class="list-group-item d-flex justify-content-between align-items-start">'+
                '<div class="mt-1">'+
                '<div>'+
                '<a href="{%url \'task-to-todo\' task.id%}">'+
                '<input type="checkbox" value="v1" id="ididid">'+
                '</a>'+
                '</div>'+
                '</div>'+
                '<div class="ms-2 me-auto">'+
                '<div class="fw-bold" id="b_task_name">'+response.pending_tasks[key].task_name+
                '</div>'+
                '<p style="font-size: x-small; margin:0;">'+response.pending_tasks[key].added_date+
                '</p>'+
                '</div>'+
                '<div class="me-5 d-flex align-items-center">'+
                '<div class="mt-1">'+
                '<a href="{%url \'todo-details\'%}">'+
                '<i class="fa-solid fa-arrow-up-right-from-square text-muted"></i>'+
                '</a>'+
                '</div>'+
                '</div>'+
                '</li>'+
                '</ol>'
                $("#display-data").append(section);
            
              }

              
              
    
    
            }
          },
          error: function(response){
            console.log('Error');
          },
          
        });
      }
    });

  });
  $(".checkboxes").click(function () {
    if ($(this).is(":checked")) {
      check_id=$(this).attr("id");
      todo_id=parseInt($(this).attr("value"))
      console.log(typeof(check_id));
      console.log(todo_id);
      var token =  $('input[name=csrfmiddlewaretoken]').val();

      var data = {"check_box_id": check_id, "todo_id": todo_id}
      
      
      console.log(data);
      $.ajax({
        type:'POST',
        url:'/task/'+todo_id+'/new_todo/',
        processData: false,
        contentType: false,
        data: data,
        success: function(data){
          console.log("Data send to backend");
          $("#"+todo_id).hide();

          $.ajax({
            type:'GET',
            url:'/todo/home/test/',
            success: function(response){
              console.log(response);
              // $("#display-todo-data").empty();
  
              
      
              for(var key in response.todos){
                arr_len = response.todos.length
                if(key==arr_len-1){
                  console.log(response.todos.length);
                  var todo_section = '<ol class="list-group mb-3 v1" id='+response.todos[key].id+'>'+
                  '<li class="list-group-item d-flex justify-content-between align-items-start">'+
                  '<div class="ms-2 me-auto d-flex">'+
                  '<div>'+
                  '<div class="fw-bold">'+response.todos[key].task_name+
                  '</div>'+
                  '<p style="font-size: x-small; margin:0;">'+response.todos[key].added_date+
                  '</p>'+
                  '<div  style="max-width: 100px; display:flex; ">'+
                  '<div>'+
                  '<p id="task_note" style="text-overflow: ellipsis;"></p>'+
                  '</div>'+
                  '</div>'+
                  '</div>'+
                  '<div class="mt-1 ms-4">'+
                  '<a href="{%url \'todo-details\'%}">'+
                  '<i class="fa-solid fa-arrow-up-right-from-square text-muted"></i>'+
                  '</a>'+
                  '</div>'+
                  '</div>'+
                  '<div class="d-flex flex-column">'+
                  '<div style="align-self: flex-end;">'+
                  '<span class="badge  rounded-pill" id="badge1" style="background-color: #0d6efd;">&nbsp&nbsp&nbsp'+
                  '</span>'+
                  '</div>'+
                  '<div class="mt-2 d-flex">'+
                  '<div class="me-2">'+
                  '<input type="submit" value="Note" id="noteBtn1" onclick="taskNotePopup()"'+
                  'class="btn btn-success"'+
                  'style="font-size: xx-small;">'+
                  '</div>'+
                  '<div>'+
                  '<input type="submit" value="New" id="myButton1" onclick="btnchange()" '+
                  'class="btn btn-primary" '+
                  'style="font-size: xx-small;">'+
                  '</div>'+
                  '</div>'+
                  '</div>'+
                  '</li>'+
                  '</ol>'
                  $("#display-todo-data").append(todo_section);


                  // var section = '<ol class="list-group mb-3 v1" id='+response.pending_tasks[key].id+'>'+
                  // '<li class="list-group-item d-flex justify-content-between align-items-start">'+
                  // '<div class="mt-1">'+
                  // '<div>'+
                  // '<a href="{%url \'task-to-todo\' task.id%}">'+
                  // '<input type="checkbox" value="v1" id="ididid">'+
                  // '</a>'+
                  // '</div>'+
                  // '</div>'+
                  // '<div class="ms-2 me-auto">'+
                  // '<div class="fw-bold" id="b_task_name">'+response.pending_tasks[key].task_name+
                  // '</div>'+
                  // '<p style="font-size: x-small; margin:0;">'+response.pending_tasks[key].added_date+
                  // '</p>'+
                  // '</div>'+
                  // '<div class="me-5 d-flex align-items-center">'+
                  // '<div class="mt-1">'+
                  // '<a href="{%url \'todo-details\'%}">'+
                  // '<i class="fa-solid fa-arrow-up-right-from-square text-muted"></i>'+
                  // '</a>'+
                  // '</div>'+
                  // '</div>'+
                  // '</li>'+
                  // '</ol>'
                  // $("#display-data").append(section);
              
                }
  
                
                
      
      
              }
            },
          });
        }


      });

    } 
    
  });

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
//jquery ends


//functions

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

  // var section = '<ol class="list-group mb-3 v1" id="{{task.id}}">'+
  // '<li class="list-group-item d-flex justify-content-between align-items-start">'+
  // '<div class="mt-1">'+
  // '<div>'+
  // '<a href="{%url \'task-to-todo\' task.id%}">'+
  // '<input type="checkbox" value="v1" id="ididid">'+
  // '</a>'+
  // '</div>'+
  // '</div>'+
  // '<div class="ms-2 me-auto">'+
  // '<div class="fw-bold" id="b_task_name">'+response.pending_tasks[key].task_name+
  // '</div>'+
  // '<p style="font-size: x-small; margin:0;">'+response.pending_tasks[key].added_date+
  // '</p>'+
  // '</div>'+
  // '<div class="me-5 d-flex align-items-center">'+
  // '<div class="mt-1">'+
  // '<a href="{%url \'todo-details\'%}">'+
  // '<i class="fa-solid fa-arrow-up-right-from-square text-muted"></i>'+
  // '</a>'+
  // '</div>'+
  // '</div>'+
  // '</li>'+
  // '</ol>'
  // $("#display-data").append(section);


  //form submission without page refresh (file upload not working)

  // $(document).on('submit', '#create_new_task_form', function(e){
  //   console.log('sub');
  //   e.preventDefault();
  //   $.ajax({
  //     type:'POST',
  //     url: "/todo/home/",
  //     data:{
  //       task_name : $('#task_name').val(),
  //       description : $('#task_desc').val(),
  //       cats : $('#task_cat').val(),
  //       task_image : $('#task_image').val(),
  //       needed_time : $('#task_avail_time').val(),
  //       csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
  //     },
  //     success: function(){

  //     }
    

  //   });
  //   $("#create_new_task_form")[0].reset();
  // });
  



