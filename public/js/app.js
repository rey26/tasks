

$(document).ready(function(){
  
  getAllTasks();
  
  $('#newForm').click(function(){
    showNewForm(event);
  });

  $(document).on('click','#submitForm', function(){
    submitForm(event);
  });

  // mark task as done

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
  // send value

  // retrieve new value as response 
  // add new element to DOM 
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

function showTasks(tasks){
  let tasksElement = '<ul class="list-group">';
  tasks.forEach(task => {
    tasksElement += `<li class="list-group-item">${task.description}</li>`;
  });
  tasksElement += '</ul>';
  $('#tasksRoot').html(tasksElement);
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




