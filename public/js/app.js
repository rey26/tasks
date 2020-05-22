

$(document).ready(function(){
  
  getAllTasks();
  
  $('#newForm').click(function(){
    showNewForm(event);
  });

  $(document).on('click','#submitForm', function(){
    submitForm(event);
  });

  // mark task as done
  $(document).on("click", "#notDone > li", function(){
    $(this).remove();
    markAsDone($(this).data("id"));
  });

  // reorder tasks

  // store tasks in localstorage?


});

function submitForm(event){
  event.preventDefault();

  //get value
  let value = $('#form').val();

  // validate value
  if(value.length < 1)
    value = "New Task";

  // create data to send
  const data = {
    "description": value
  }

  // retrieve new value as response 
  $.ajax("./api/task", {
    type: "POST",
    data,
    success: function(task){
      // add new element to DOM 
      $('#notDone').append(renderTask(task));
    },
    failure: function(data){
      console.log("All tasks error: " + data);
    }

  });
  
  // hide input field and show new button
  $('#formRoot').html('');
  $('#newForm').show();

}

function showNewForm(event){
  event.preventDefault();
  // hide button new 
  $('#newForm').hide();
  // create form 
  let form = `<div class="form">
                <input id="form" type="text" class="form-control" placeholder="Pridat ulohu" required/>
                <a id="submitForm" class="btn btn-success">Add</a>
              </div>`;
  $('#formRoot').append(form);
}

function renderTask(task){
  return `<li class="list-group-item" data-id="${task.task_id}">${task.description}</li>`
}

function showTasks(tasks){
  let html = '';
  tasks.forEach(task => {
    if(task.is_done){
      addDoneTask(task);
    }
    else {
      html += renderTask(task);
    }
  });
  $('#notDone').append(html);
}

function getAllTasks(){
  $.get({
      url: "/api/all-tasks",
      success: function(result){
        showTasks(result);
      },
      failure: function(data){
          console.log("All tasks error: " + data);
      }
  });
}

function markAsDone(taskId){
  $.get({
    url: `/api/set-as-done/${taskId}`,
    success: function(result){
      // check if ul has children, if not add header
      addDoneTask(result);
    },
    failure: function(data){
        console.log("All tasks error: " + data);
    }
  });
}

function addDoneTask(task){
  if($('ul#done li').length == 0)
    $('#done').append('<li class="list-group-item header">Hotove ulohy</li>');
  
  $('#done').append(renderTask(task));
}



