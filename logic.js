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
    if( !Object.keys(newTodo).includes('id'))
    newTodo.id=this.generateId();
    if( !Object.keys(newTodo).includes('done'))
    newTodo.done=false;
    return newArr.concat(newTodo);
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

  sortTodos: function(todos, sortFunction) {
    var newArr = this.cloneArrayOfObjects(todos);

    newArr.sort(sortFunction);
    return newArr;
  }
};

if (typeof module !== "undefined") {
  module.exports = todoFunctions;
}
