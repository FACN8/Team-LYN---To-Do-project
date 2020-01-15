var todoFunctions = require('./logic');
var dom = require('./dom');
const requiredKeys = ['id','description','done'];

const makeTea = {
  id: 2, // this is a unique number, it will be needed to find a to-do in a to-do list
  description: "make tea", // this is a string that describes what you need to do
  done: false, // This is true or false, it tells us whether a todo is done or not
}

const toDoArray = [{
  id:0,
  description:"Make breakfast",
  done:false
},
{
  id:1,
  description:"Do the dishes",
  done:true
}]

describe('Example test', function() {
  it('should do something', function() {
    expect(1).toBe(1);
  });
});

describe('addTodo tests ', function() {

  it('should have a new copy of new to-do at the end', function() {
    const result = todoFunctions.addTodo(toDoArray,makeTea);
    const actual = makeTea;
    expect(result[result.length - 1]).toEqual(actual);
  });
  it('should not change the original input toDoArray', function() {
    const result = todoFunctions.addTodo(toDoArray,makeTea);
    const actual = toDoArray;
    expect(result).not.toBe(actual);
  });
  it('should not change the original new todo', function() {
    const result = todoFunctions.addTodo(toDoArray,makeTea)[toDoArray.length];
    const actual = makeTea;
    expect(makeTea).toBe(actual);
  });
  it('should have id,description,done keys', function() {
    const result = todoFunctions.addTodo(toDoArray,{
      description:'An object with description only'
    })[toDoArray.length];
    const resultKeys = Object.keys(result);
    const actual = requiredKeys;
    expect(resultKeys).toEqual(actual);
  });


});


/*************************   DELETE TO DO        ***********************/
describe('deleteTodo test', function() {

  it('should be able to delete the first item', function() {
  const result = todoFunctions.deleteTodo(toDoArray,0);
  const actual = toDoArray[0]
  expect(result).not.toContain(actual);
  });
  
  it('should not change the original input todos', function() {
  const result = todoFunctions.deleteTodo(toDoArray,0)
  const actual = toDoArray
  expect(result).not.toBe(actual);
  });
  
  });

///***********            MARK TO DO        ****************/
describe('markTodo tests ', function() {

  it('should return a new array', function() {
    const result = todoFunctions.markTodo(toDoArray,0);
    const actual = toDoArray;
    expect(result).not.toBe(actual);
  });

  it('should not modify done on the original todos', function() {
    const actual = toDoArray[0].done;
    const result = todoFunctions.markTodo(toDoArray,0)[0].done;
    expect(result).not.toBe(actual);
  });

  it('should have toggled done for the target todo', function() {
    const result = todoFunctions.markTodo(toDoArray,0)[0].done;
    const actual = !toDoArray[0].done;
    expect(result).toBe(actual);
  });

  it('should not toggle other todos', function() {
    const result = todoFunctions.markTodo(toDoArray,1)[0].done;
    const actual = toDoArray[0].done;
    expect(result).toBe(actual);
  });

});


/*******   create Todo node       **********/

// describe('create TodoNode tests', function() {

//   it('should return a new Todo node in the dom', function() {
//     const result = dom.createTodoNode(makeTea);
//     const actual = toDoArray[0].done;
//     expect(result).toBe(actual);
//   });

// });