

$(document).ready(function(){
  
  getAllTasks();
  
  // show new form for task when big plus button is clicked
  $('#newForm').click(function(){
    showNewForm(event);
  });

  // submit form with new task
  $(document).on('click','#submitForm', function(){
    submitForm(event);
  });

  // mark task as done
  $(document).on('click', '#notDone > li', function(){
    // remove element from list
    $(this).remove();
    // mark the task as done
    markAsDone($(this).data("id"));
  });

  // reorder tasks
  $(document).on('click', '#changeOrder', function(){
    // get order value from element
    let order = $(this).attr("data-order");
    // check BE docs for meaning of ordering -> 1 for oldest first and 0 for latest first
    if(order == 1){
      // toggle value of element
      $(this).attr("data-order", "0");
      getAllTasks(1);
    } else {
      // toggle value of element
      $(this).attr("data-order", "1");
      getAllTasks();
    }
  });

});

function submitForm(event){
  event.preventDefault();

  //get value
  let value = $('#form').val();

  // validate value and set default value
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
  
  // hide input field and show big plus button
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
                <input id="form" type="text" class="form-control" placeholder="Pridať úlohu" required/>
                <a id="submitForm" class="button"><span class="material-icons">cloud_upload</span></a>
              </div>`;
  $('#formRoot').append(form);
}

function renderTask(task){
  // add classic checked logo if task is done
  if(task.is_done == 1)
    return `<li class="list-group-item" data-id="${task.task_id}"><span class="material-icons">check_circle</span><span>${task.description}</span></li>`;
  // otherwise add just outline checked logo
  return `<li class="list-group-item" data-id="${task.task_id}"><span class="material-icons">check_circle_outline</span><span>${task.description}</span></li>`;
}

function showTasks(tasks){
  let html = '';
  // remove child nodes from #done and #notDone lists
  $('#notDone').empty();
  $('#done').empty();

  // iterate tasks and sort them to #done and #notDone lists
  tasks.forEach(task => {
    if(task.is_done){
      addDoneTask(task);
    }
    else {
      html += renderTask(task);
    }
  });
  // add task which is not done to #notDone list
  $('#notDone').append(html);
}


function getAllTasks(order = 0){
  // order is optional, set to 0 by default
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
  // id of task to be set as done
  $.get({
    url: `/api/set-as-done/${taskId}`,
    success: function(result){
      addDoneTask(result);
    },
    failure: function(data){
        console.log("All tasks error: " + data);
    }
  });
}

function addDoneTask(task){
  
  // check if ul has children, if not add header
  if($('ul#done li').length == 0)
    $('#done').append('<li class="list-group-item header">Dokončené</li>');
  
  $('#done').append(renderTask(task));
}



