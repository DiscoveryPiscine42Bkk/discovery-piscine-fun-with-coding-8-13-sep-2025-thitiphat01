$(document).ready(function() {
  const $ftList = $('#ft_list');
  const $newBtn = $('#newBtn');
  
  const savedTodos = getCookie('todoList');
  if (savedTodos) {
    const todos = JSON.parse(decodeURIComponent(savedTodos)).reverse();
    $.each(todos, function(index, todo) {
      addTodoToList(todo);
    });
  }

  $newBtn.on('click', function() {
    const newTodo = prompt("Enter a new TO DO:");
    if (newTodo) {
      addTodoToList(newTodo);
      saveTodos();
    }
  });

  function addTodoToList(todoText) {
    const $todoDiv = $('<div></div>', {
      class: 'todo-item',
      text: todoText,
    }).on('click', function() {
      const confirmDelete = confirm("Do you want to remove this TO DO?");
      if (confirmDelete) {
        $(this).remove();
        saveTodos();
      }
    });
    $ftList.prepend($todoDiv);
  }

  function saveTodos() {
    const todos = [];
    $('.todo-item').each(function() {
      todos.push($(this).text());
    });
    document.cookie = `todoList=${encodeURIComponent(JSON.stringify(todos))}; path=/;`;
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`; 
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(';').shift());
    }
    return '';
  }
  

});