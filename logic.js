// Part 1. Fill in any missing parts of the todoFunction object!
// you can access these on todo.todoFunctions
// For part one we expect you to use tdd

var todoFunctions = {
  // todoFunctions.generateId() will give you a unique id
  // You do not need to understand the implementation of this function.
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
    return todos.map(function(todo){
      return JSON.parse(JSON.stringify(todo));
    });
  },
  
  addTodo: function(todos, newTodo) {
    // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
    // returns a new array, it should contain todos with the newTodo added to the end.
    // add an id to the newTodo. You can use the generateId function to create an id.
    // hint: array.concat
    var newArr = this.cloneArrayOfObjects(todos);
    return newArr.concat(todoFunctions.makeNewTodo(newTodo.id,newTodo.description,newTodo.done));
    
  },
  deleteTodo: function(todos, idToDelete) {
    // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
    // return a new array, this should not contain any todo with an id of idToDelete
    // hint: array.filter
    var newArr = this.cloneArrayOfObjects(todos);
    return newArr.filter(element => element.id !==idToDelete);
  },
  markTodo: function(todos, idToMark) {
    // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
    // in the new todo array, all elements will remain unchanged except the one with id: idToMark
    // this element will have its done value toggled
    // hint: array.map
    // var newArr = todoFunctions.cloneArrayOfObjects(todos);
    var newArr = this.cloneArrayOfObjects(todos);
    return(newArr.map(element=>{
      if(element.id === idToMark){
      element.done = !element.done;}
      return element;
      }));
},
  makeNewTodo: function(
    id=todoFunctions.generateId(),
    description='Unknown task',
    done=false){
      
      let newTodo ={};
      newTodo.id=id;
      newTodo.description=description;
      newTodo.done=done;
      return newTodo;
    },
  sortTodos: function(todos, sortFunction) {
    // stretch goal! Do this last
    // should leave the input arguement todos unchanged (you can use cloneArrayOfObjects)
    // sortFunction will have same signature as the sort function in array.sort
    // hint: array.slice, array.sort
    var newArr = this.cloneArrayOfObjects(todos);
    
    newArr.sort(function (a,b) {
      return a.id - b.id;
    })
    return newArr
  },
};


// Why is this if statement necessary?
// The answer has something to do with needing to run code both in the browser and in Node.js
// See this article for more details: 
// http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
if (typeof module !== 'undefined') {
  module.exports = todoFunctions;
}
