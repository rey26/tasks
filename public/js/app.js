

$(document).ready(function(){
  
  showTasks();
  
  $('#newForm').click(function(){
    showNewForm(event);
  });

  $('#submitForm').click(function(){
    submitForm(event);
  });

  
  function showTasks(){

  }
});

function submitForm(event){
  event.preventDefault();

}

function showNewForm(event){
  event.preventDefault();
  $('#newForm').hide();
  let form = `<div class="form">
                <input type="text" class="form-control" placeholder="Pridat ulohu"/>
                <a id="submitForm" class="btn btn-success">Add</a>
              </div>`;
  $('#formRoot').append(form);
}




