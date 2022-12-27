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
    // console.log(task_name, description, cats, needed_time, token);


    $.ajax({
      url: "/todo/home/",
      method: "POST",
      processData: false,
      contentType: false,
      mimeType: "multipart/form-data",
      data: data,
      success: function(data){
        console.log('Data send to the backend from form');
        $("#create_new_task_form")[0].reset();
        $("#new_task_data").css('display', 'none');
        $("#top-left").css('min-height', '100vh');
        $("#top-right").css('min-height', '100vh');
        $.ajax({
          type: 'GET',
          url: '/todo/home/test/',
          success: function(response){
            // console.log(response);
            // $("#display-data").empty();

            
    
            for(var key in response.pending_tasks){
              arr_len = response.pending_tasks.length
              var myDate = response.pending_tasks[key].added_date;
              var d = new Date( myDate );
              if ( !!d.valueOf() ) { // Valid date
                  year = d.getFullYear();
                  month = d.getMonth();
                  day = d.getDate();
              } else { /* Invalid date */ }
              console.log(year, month, day);

              if(key==arr_len-1){
                // console.log(response.pending_tasks.length);
                var section = '<ol class="list-group mb-3 v1" id="'+response.pending_tasks[key].id+'">'+
                '<li class="list-group-item d-flex justify-content-between align-items-start">'+
                '<div class="mt-1">'+
                '<div>'+
                '<input class="checkboxes" type="checkbox" value="'+response.pending_tasks[key].id+
                '" id="check'+response.pending_tasks[key].id+'">'+
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
                '<a href="/todo/'+response.pending_tasks[key].id+'/details/">'+
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

  $(document).on('click', '.checkboxes', function(e){
    e.preventDefault();
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
        success: function(response){
          console.log("**********Data send to backend");
          var new_id = response['new_id'];
          var new_color = response['new_color'];
          var new_status = response['new_status']
          var new_todo_note = response['new_todo_note']
          $("#"+todo_id).hide();

          $.ajax({
            type:'GET',
            url:'/task/'+todo_id+'/new_todo/',
            success: function(response){
              // console.log(response);
              // $("#display-todo-data").empty();
              // console.log('!!!!!!!!!!!!!!!!!!!!');
              // console.log(response);
              // console.log(response.latest_todo.id);
              // for(var key in response.todos){
              //   arr_len = response.todos.length
              //   if(key==arr_len-1){
                  // console.log(response.todos.length);
                  // console.log('++++++++++++++')
                  // console.log(response);
                  var todo_section = '<ol class="list-group mb-3 v1" id="'+response.latest_todo.id+'right">'+
                  '<li class="list-group-item d-flex justify-content-between align-items-start">'+
                  '<div class="ms-2 me-auto d-flex">'+
                  '<div>'+
                  '<div class="fw-bold">'+response.latest_todo_name+
                  '</div>'+
                  '<p style="font-size: x-small; margin:0;">'+response.latest_todo_added_date+
                  '</p>'+
                  '<div  style="max-width: 100px; display:flex; ">'+
                  '<div id="'+new_id+'task_note">'+
                  new_todo_note+
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
                  //here
                  '<div style="align-self: flex-end;" id="'+new_id+'badge_live">'+
                  '<span class="badge  rounded-pill" id="'+new_id+'badge" style="background-color:'+new_color+';">&nbsp&nbsp&nbsp'+
                  '</span>'+
                  '</div>'+
                  '<div class="mt-2 d-flex">'+
                  '<div class="me-2">'+
                  '<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal'+new_id+'" style="font-size: xx-small;">'+
                  'Note'+
                  '</button>'+
                  
                  '<div class="modal fade" id="exampleModal'+new_id+'" tabindex="-1" aria-labelledby="exampleModalLabel'+new_id+'" aria-hidden="true">'+
                  '<div class="modal-dialog">'+
                  '<div class="modal-content">'+
                  '<div class="modal-header">'+
                  '<h1 class="modal-title fs-5" id="exampleModalLabel'+new_id+'">Create Task Note</h1>'+
                  '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
                  '</div>'+
                  '<form action="/todo/'+new_id+'/add_note/" method="post" class="task_note_form" name="'+new_id+'" enctype="multipart/form-data">'+
                  
                  '<div class="modal-body">'+
                  '<div>'+
                  '<h2>Add Task Note</h2>'+
                  '</div>'+
                  '<div class="mb-3">'+
                  '<textarea name="note" id="note'+new_id+'" cols="15" rows="5" class="form-control" required></textarea>'+
                  '</div>'+
                  '</div>'+
                  '<div class="modal-footer">'+
                  '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'+
                  '<input type="submit" class="btn btn-primary note_submit_btns" value="Create" data-bs-dismiss="modal" name="'+new_id+'">'+
                  '</div>'+
                  '</form>'+
                  '</div>'+
                  '</div>'+
                  '</div>'

                  '</div>'+
                  '<div id="'+new_id+'btn_live_change">'+
                  '<div id="'+new_id+'btn_live">'+
                  '<input type="submit" value="'+new_status+'" id="'+new_id+'" '+
                  'class="btn btn-primary stat_btns" '+
                  'style="font-size: xx-small;">'+
                  '</div>'+
                  '</div>'+
                  '</div>'+
                  '</div>'+
                  '</li>'+
                  '</ol>'+
                  

                  // $("#"+new_id+"btn_live").show();
                  $("#display-todo-data").append(todo_section);
              //   }
              // }
            },
          });
        }


      });

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


  //btn change for todos
  $(document).on('click', '.stat_btns', function(e){
    e.preventDefault();
    id=parseInt($(this).attr("id"));
    value = $(this).attr("value");
    data = {'id':id, 'value':value}
    $.ajax({
      type:'POST',
        url:'/todo/'+id+'/',
        processData: false,
        contentType: false,
        data: data,
        success: function(data){
          console.log('data send to backend!!!!');
          // $("#"+id+"btn_live").empty();

          $.ajax({
            type:'GET',
            url:'/todo/'+id+'/',
            success: function(response){
              console.log(id);
              console.log(response);
              console.log(response.new_status)
              var todo_stat_btn = '<div id='+id+'btn_live>'+
              '<input type="submit" value="'+response.new_status+'"id="'+id+'"class="btn btn-primary stat_btns"'+
              'style="font-size: xx-small;">'+
              '</div>'
              $("#"+id+"btn_live_change").empty();
              $("#"+id+"btn_live_change").append(todo_stat_btn);
              $("#"+id+"badge").css('background', response.new_status_color);
            }
          });
        }
    });
  });


  //task note submit form
  $(document).on('submit', '.task_note_form', function(e){
    e.preventDefault();
    id=parseInt($(this).attr("name"));
    var task_note = $("#note"+id).val();
    var token =  $('input[name=csrfmiddlewaretoken]').val();
    fdata = new FormData();
    fdata.append("csrfmiddlewaretoken", token)
    fdata.append("task_note", task_note)


    $.ajax({
      type:'POST',
      url:'/todo/'+id+'/add_note/',
      processData: false,
      contentType: false,
      mimeType: "multipart/form-data",
      data: fdata,
      success: function(data){
        $(".task_note_form")[0].reset();
        // $(".modal").hide();
        $.ajax({
          type: 'GET',
          url: '/todo/'+id+'/add_note/',
          success: function(response){
            $("#"+id+"task_note").empty();
            $("#"+id+"task_note").append(response.new_task_note);
            
          }
        });

      }

    });
        

    
  });
  

});
//jquery ends


//functions


// function btnchange() 
// {
    
//     var elem = document.getElementById("myButton1");
//     var badge = document.getElementById("badge1");
//     if (elem.value=="New"){
//       elem.value = "Partially completed";
//       badge.style.background = "yellow";
//     } 
//     else if (elem.value=="Partially completed"){
//       elem.value = "Completed";
//       badge.style.background = "green";

//     } 
//     else if (elem.value=="Completed"){
//       elem.value = "Canceled";
//       badge.style.background = "red";

//     } 
//     else{
//       elem.value = "New";
//       badge.style.background = "#0d6efd";

//     } 
// }




  // function taskNotePopup() {
  //   document.getElementById("popupForm").style.display = "block";
  //   // document.getElementById("popupForm").style.position = "fixed";
  //   // document.getElementById("popupForm").style.top = "200px";

  //   // document.getElementById("popupForm").style.left = "100px";

  // }
  // function submitfunction() {
  //   // document.getElementById("popupForm").style.position = "relative";
  //   document.getElementById("popupForm").style.display = "none";
  //   var value1 = document.getElementById('note').value
  //   console.log(typeof(value1));
  //   if (value1.length<30){
  //     document.getElementById('task_note').innerText=value1
  //   }
  //   else{
  //     var output = ""
  //   for(let char of value1){
  //     output += char
  //     if (output.length==30){
  //       const para = document.createElement("p");
  //       para.innerText = output;
  //       // document.body.appendChild(para);
  //       document.getElementById('task_note').appendChild(para)
  //       output = ''
  //     }
  //   }
  //   }
    
    

  // }
  // function closeForm() {
  //   // document.getElementById("popupForm").style.position = "relative";
  //   document.getElementById("popupForm").style.display = "none";
    
  // }

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
  

  // $.ajax({
  //   type: "GET",
  //   url: "/todo/livedata/",
  //   success: function(response){
  //     console.log(response);
  //     const stat_names_arr = []
  //     for(var key in response.stat_names){
  //       stat_names_arr.push(response.stat_names[key])
  //     }
  //     len = stat_names_arr.length
  //     for(let i=0; i<len;i++){
  //       if(i == len-1){
  //         if(value==stat_names_arr[i]){
  //           $(this).attr("value",stat_names_arr[i+1]);
  //           // $("#"+id+"badge").css('background', 'yellow');
  //         }
  //       }
  //     }
  //   }
  // });



