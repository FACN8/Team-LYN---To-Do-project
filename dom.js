// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application

const submitForm =
  (function () {
    // This is the dom node where we will keep our todo
    var container = document.querySelector('.content');
    var addTodoForm = document.querySelector('.add-todo');
    var header = document.querySelector('.header')
    var removeDone = document.getElementById('removeDone')

    var state = [

      {
        id: -4, description: '"Refresh" button removes all done tasks',
        done: false
      },
      {
        id: -3, description: '"checkmark" button sorts by done',
        done: false
      },
      {
        id: -5, description: '"AZ" button sorts Alphabetically',
        done: false
      },
      {
        id: -2, description: 'To create a new todo use the form bellow',
        done: false
      },
      {
        id: -1, description: 'Be Awesome!',
        done: true
      },
      {
        id: -0, description: 'Love this To-Do list!!',
        done: true
      },
    ]; // this is our initial todoList

    // This function takes a todo, it returns the DOM node representing that todo
    var createTodoNode = function (todo) {
      var todoNode = document.createElement('li');
      // you will need to use addEventListener
      todoNode.className += ' item';




      // this adds the delete button
      var deleteButtonNode = document.createElement('i');
      deleteButtonNode.className += ' fas fa-trash';
      // deleteButtonNode[aria-hidden]='true';
      deleteButtonNode.addEventListener('click', function (event) {
        var newState = todoFunctions.deleteTodo(state, todo.id);
        update(newState);
      });
      todoNode.appendChild(deleteButtonNode);


      // add markTodo button
      var markButtonNode = document.createElement('i');
      markButtonNode.className += ' far fa-circle';
      if (todo.done) {
        todoNode.style.textDecoration = "line-through"
      }
      markButtonNode.addEventListener('click', function (event) {
        var newState = todoFunctions.markTodo(state, todo.id);
        update(newState);
      });
      todoNode.appendChild(markButtonNode);
      // add span holding description
      var spanNode = document.createElement('span');
      var textNode = document.createTextNode(todo.description);
      spanNode.innerText.strike();
      spanNode.appendChild(textNode);
      todoNode.appendChild(spanNode);

      // var markButtonNode = document.createElement('button');
      // markButtonNode.textContent='Mark'
      // markButtonNode.addEventListener('click', function(event) {
      //   var newState = todoFunctions.markTodo(state, todo.id);
      //   update(newState);
      // });
      // todoNode.appendChild(markButtonNode);


      // add classes for css
      spanNode.className += ' description';

      return todoNode;
    };

    // bind create todo form
    if (addTodoForm) {
      addTodoForm.addEventListener('submit', function (event) {
        // https://developer.mozilla.org/en-US/docs/Web/Events/submit
        // what does event.preventDefault do?
        // what is inside event.target?
        event.preventDefault();
        var description = event.target.description.value; // event.target ....
        var newTodo = todoFunctions.makeNewTodo(undefined, description, undefined)
        // hint: todoFunctions.addTodo
        createTodoNode(newTodo);
        var newState = todoFunctions.addTodo(state, newTodo);
        addTodoForm.reset();
        update(newState);
      });
    }

    // add sort by done button
    var sortByDoneButton = document.createElement('i');
    sortByDoneButton.className += ' fas fa-check-square'
    sortByDoneButton.addEventListener('click', function (event) {
      var newState = todoFunctions.sortTodos(state, (a, b) => !a.done ? (!b.done ? 0 : -1) : (b.done ? 0 : 1))
      update(newState);
    });
    header.appendChild(sortByDoneButton);

    //Remove done by clicking reset button
    removeDone.addEventListener('click', function (event) {
      var newState = state.filter(e => !e.done)
      update(newState);
    });




    // (a.done > b.done) ? a.done : b.done
    // add sort alphabetically
    var sortByDescriptionButtonNode = document.createElement('i');
    sortByDescriptionButtonNode.className += ' fas fa-sort-alpha-up'
    sortByDescriptionButtonNode.addEventListener('click', function (event) {
      var newState = todoFunctions.sortTodos(state, (a, b) => a.description.toUpperCase().localeCompare(b.description.toUpperCase()));
      update(newState);
    });
    header.appendChild(sortByDescriptionButtonNode);
    // you should not need to change this function
    var update = function (newState) {
      state = newState;
      renderState(state);
    };


    // you do not need to change this function
    var renderState = function (state) {
      var todoListNode = document.createElement('ul');

      state.forEach(function (todo) {
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