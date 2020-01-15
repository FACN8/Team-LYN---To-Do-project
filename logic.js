var todoFunctions = {
  generateId: (function() {
    var idCounter = 0;

    function incrementCounter() {
      return (idCounter += 1);
    }

    return incrementCounter;
  })(),

  //cloneArrayOfObjects will create a copy of the todos array
  //changes to the new array don't affect the original
  cloneArrayOfObjects: function(todos) {
    return todos.map(function(todo) {
      return JSON.parse(JSON.stringify(todo));
    });
  },

  addTodo: function(todos, newTodo) {
    var newArr = this.cloneArrayOfObjects(todos);
    return newArr.concat(
      todoFunctions.makeNewTodo(newTodo.id, newTodo.description, newTodo.done)
    );
  },
  deleteTodo: function(todos, idToDelete) {
    var newArr = this.cloneArrayOfObjects(todos);
    return newArr.filter(element => element.id !== idToDelete);
  },
  markTodo: function(todos, idToMark) {
    var newArr = this.cloneArrayOfObjects(todos);
    return newArr.map(element => {
      if (element.id === idToMark) {
        element.done = !element.done;
      }
      return element;
    });
  },
  makeNewTodo: function(
    id = todoFunctions.generateId(),
    description = "Unknown task",
    done = false
  ) {
    let newTodo = {};
    newTodo.id = id;
    newTodo.description = description;
    newTodo.done = done;
    return newTodo;
  },
  sortTodos: function(todos, sortFunction) {
    var newArr = this.cloneArrayOfObjects(todos);

    newArr.sort(sortFunction);
    return newArr;
  }
};

if (typeof module !== "undefined") {
  module.exports = todoFunctions;
}
