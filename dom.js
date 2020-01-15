// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application

const submitForm = 
(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');

  var state = [
    { id: -3, description: 'Hello! plan your day today!' },
    { id: -2, description: 'To create a new todo use the form bellow' },
    { id: -1, description: 'third todo' },
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement('li');
    // you will need to use addEventListener

    // add span holding description
    var spanNode = document.createElement('span');
    var textNode = document.createTextNode(todo.description);
    spanNode.appendChild(textNode);
    todoNode.appendChild(spanNode);
    // this adds the delete button
    var deleteButtonNode = document.createElement('button');
    deleteButtonNode.textContent='X';
    deleteButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    // add markTodo button
    var markButtonNode = document.createElement('button');
    markButtonNode.textContent='Mark'
    markButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(markButtonNode);
    // add classes for css
    markButtonNode.className+= " actionButton";
    deleteButtonNode.className+= " actionButton"
    spanNode.className+= " description"
    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function(event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?
      event.preventDefault();
      var description = event.target.description.value; // event.target ....
      console.log(description);
      var newTodo = todoFunctions.makeNewTodo(undefined,description,undefined)
      // hint: todoFunctions.addTodo
      createTodoNode(newTodo);
      var newState = todoFunctions.addTodo(state,newTodo); // ?? change this!
      
      update(newState);
    });
  }

  // you should not need to change this function
  var update = function(newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement('ul');

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();

if (typeof module !== 'undefined') {
  module.exports = submitForm;
}