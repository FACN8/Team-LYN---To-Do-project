const submitForm = (function() {
  var container = document.querySelector(".content");
  var addTodoForm = document.querySelector(".add-todo");
  var header = document.querySelector(".header");
  var removeDone = document.getElementById("removeDone");

  var state = [
    {
      id: -4,
      description: '"Refresh" button removes all done tasks',
      done: false
    },
    {
      id: -3,
      description: '"checkmark" button sorts by done',
      done: false
    },
    {
      id: -5,
      description: '"AZ" button sorts Alphabetically',
      done: false
    },
    {
      id: -2,
      description: "To create a new todo use the form bellow",
      done: false
    },
    {
      id: -1,
      description: "Be Awesome!",
      done: true
    },
    {
      id: -0,
      description: "Love this To-Do list!!",
      done: true
    }
  ];

  var createTodoNode = function(todo) {
    var todoNode = document.createElement("li");
    todoNode.className += " item";

    // Creating the delete button
    var deleteButtonNode = document.createElement("i");
    deleteButtonNode.className += " fas fa-trash";
    deleteButtonNode.addEventListener("click", function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    // Creating the mark button
    var markButtonNode = document.createElement("i");
    markButtonNode.className += " far fa-circle";

    markButtonNode.addEventListener("click", function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(markButtonNode);
    // Creating a span holding description
    var spanNode = document.createElement("span");
    var textNode = document.createTextNode(todo.description);
    spanNode.appendChild(textNode);
    todoNode.appendChild(spanNode);
    // Striking the text if the done=true
    if (todo.done) {
      spanNode.style.textDecoration = "line-through";
      markButtonNode.className = " fas fa-circle";
    }

    // add classes for css
    spanNode.className += " description";

    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function(event) {
      event.preventDefault();
      var description = event.target.description.value;
      if(description==='' || description.length > 300){
        event.target.description.value="INVALID-Enter Todo between 1 and 300 words"
        return;
      }
      var newTodo ={description:description}
      var newState = todoFunctions.addTodo(state, newTodo);
      addTodoForm.reset();
      update(newState);
    });
  }

  // add sort by done button
  var sortByDoneButton = document.createElement("i");
  sortByDoneButton.className += " fas fa-check-square";
  sortByDoneButton.addEventListener("click", function(event) {
    var newState = todoFunctions.sortTodos(state, (a, b) =>
      !a.done ? (!b.done ? 0 : -1) : b.done ? 0 : 1
    );
    update(newState);
  });
  header.appendChild(sortByDoneButton);

  //Remove marked tasks by clicking reset button
  removeDone.addEventListener("click", function(event) {
    var newState = state.filter(e => !e.done);
    update(newState);
  });

  // add sort alphabetically
  var sortByDescriptionButtonNode = document.createElement("i");
  sortByDescriptionButtonNode.className += " fas fa-sort-alpha-up";
  sortByDescriptionButtonNode.addEventListener("click", function(event) {
    var newState = todoFunctions.sortTodos(state, (a, b) =>
      a.description.toUpperCase().localeCompare(b.description.toUpperCase())
    );
    update(newState);
  });
  header.appendChild(sortByDescriptionButtonNode);
  // Bellow are functions that should not to be changed
  var update = function(newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement("ul");

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();

//check for empty text
function checkForBlank() {
  if (document.getElementById("txt").value == "") {
    alert("Please Enter something to remember..");
    return false;
  }
}
if (typeof module !== "undefined") {
  module.exports = submitForm;
}
