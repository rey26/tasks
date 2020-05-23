

$(document).ready(function(){
  
  getAllTasks();
  
  $('#newForm').click(function(){
    showNewForm(event);
  });

  $(document).on('click','#submitForm', function(){
    submitForm(event);
  });

  // mark task as done
  $(document).on('click', '#notDone > li', function(){
    $(this).remove();
    markAsDone($(this).data("id"));
  });

  // reorder tasks
  $(document).on('click', '#changeOrder', function(){
    let order = $(this).attr("data-order");
    if(order == 1){
      $(this).attr("data-order", "0");
      getAllTasks(1);
    } else {
      $(this).attr("data-order", "1");
      getAllTasks();
    }
  });

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
                <span class="material-icons">check_circle_outline</span>
                <input id="form" type="text" class="form-control" placeholder="Pridat ulohu" required/>
                <a id="submitForm" class="button"><span class="material-icons">cloud_upload</span></a>
              </div>`;
  $('#formRoot').append(form);
}

function renderTask(task){
  if(task.is_done == 1)
    return `<li class="list-group-item" data-id="${task.task_id}"><span class="material-icons">check_circle</span><span>${task.description}</span></li>`;
  return `<li class="list-group-item" data-id="${task.task_id}"><span class="material-icons">check_circle_outline</span><span>${task.description}</span></li>`;
}

function showTasks(tasks){
  let html = '';
  $('#notDone').empty();
  $('#done').empty();
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

function getAllTasks(order = 0){
  $.get({
      url: `/api/all-tasks/${order}`,
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



