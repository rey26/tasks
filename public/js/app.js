

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
      $('#tasksRoot').append(`<li class="list-group-item">${task.data.description}</li>`);
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

function showTasks(tasks){
  let html = '';
  tasks.forEach(task => {
    html += `<li class="list-group-item">${task.description}</li>`;
  });
  $('#tasksRoot').append(html);
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




