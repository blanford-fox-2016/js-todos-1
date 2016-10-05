"use strict"

var fs = require("fs");
var content = fs.readFileSync("data.json");
var jsonContent = JSON.parse(content)
var toText = JSON.stringify(jsonContent[0])
class Interface {
  static clearscreen(){
    var lines = 20
    for(var i = 0; i < lines; i++) {
    console.log('\n');
      }
    }

  static newLines(value){
    for (var i=1; i<=value; i++){
      console.log(`\n`);
          }
        }
      }

class Todo {
  constructor(property){
    this._task = content
  }
  static mainMenu(){
    console.log(`=======================================`);
    console.log(`            Welcome to Todo js`);
    console.log(`=======================================`);
    console.log(`Type following sentence to get start : `);
    console.log(`$ node todo.js help`);
    console.log(`$ node todo.js list`);
    console.log(`$ node todo.js add (type new task)`);
    console.log(`$ node todo.js task (type spesific task id)`);
    console.log(`$ node todo.js delete (type spesific task id)`);
    console.log(`$ node todo.js complete (type spesific task id)`);
    console.log(`$ node todo.js uncomplete (type spesific task id)`);
  }

  static help(){
    console.log(`========================== Help Menu ===================`);
    console.log(`$ node todo.js help >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> to view help`);
    console.log(`$ node todo.js list >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> to see all task`);
    console.log(`$ node todo.js add (type new task) >>>>>>>>>>>>>>>>>>>>> to add new task`);
    console.log(`$ node todo.js task (type spesific task id) >>>>>>>>>>>> to see selected task`);
    console.log(`$ node todo.js delete (type spesific task id) >>>>>>>>>> to delete selected task`);
    console.log(`$ node todo.js complete (type spesific task id) >>>>>>>> to see completed task`);
    console.log(`$ node todo.js uncomplete (type spesific task id) >>>>>> to see uncomplete task`);
  }
  static list(){
    console.log(`============== All List =============================`);
    for(var i=0; i<jsonContent.length; i++){
      if(jsonContent[i]._done == true){
      console.log(`[X] ${jsonContent[i]._id+1}. ${jsonContent[i]._note} `);
    }else {
      console.log(`[ ] ${jsonContent[i]._id+1}. ${jsonContent[i]._note}`);
    }
    }
  }

  static task(value){
    for(var i=0; i<jsonContent.length; i++){
      if(parseInt(value) - 1 == jsonContent[i]._id){
        if(jsonContent[i]._done == true){
          console.log(`---------------------------------------------`);
          console.log(`Task id ${jsonContent[i]._id+1} :  ${jsonContent[i]._note} | Status : Completed `);
          console.log(`---------------------------------------------`);
        } else {
          console.log(`----------------------------------------`);
          console.log(`Task id ${jsonContent[i]._id+1} :  ${jsonContent[i]._note} | Status : Uncomplete `);
          console.log(`----------------------------------------`);
        }
      }
    }
  }
  static add(value){
    value = value.join(" ")
    if(jsonContent.length == 0){
      var newTask = new Task({id:0, note:value, done:false})
      jsonContent.push(newTask)
      var write = JSON.stringify(jsonContent)
      fs.writeFileSync('data.json', write, 'utf8');
    }else{
      var newTask = new Task({id:jsonContent[jsonContent.length-1]._id+1, note:value, done:false})
      jsonContent.push(newTask)
      var write = JSON.stringify(jsonContent)
      fs.writeFileSync('data.json', write, 'utf8');
    }
    console.log(`----------------------------------------`);
    console.log(`System note : Task added successfully`);
    console.log(`----------------------------------------`);
  }

  static delete(value){
    for(var i=0; i<jsonContent.length; i++){
      if(parseInt(value) - 1 == jsonContent[i]._id){
        jsonContent.splice(i,1)
      }
    }
    var write = JSON.stringify(jsonContent)
    fs.writeFileSync('data.json', write, 'utf8');
    console.log(`----------------------------------------`);
    console.log(`System note : Task deleted successfully`);
    console.log(`----------------------------------------`);

  }

  static complete(value){
    for(var i=0; i<jsonContent.length; i++){
      if(parseInt(value)-1 == jsonContent[i]._id){
        jsonContent[i]._done = true
      }
    }
    var write = JSON.stringify(jsonContent)
    fs.writeFileSync('data.json', write, 'utf8');
    console.log(`----------------------------------------`);
    console.log(`System note : One task set to complete`);
    console.log(`----------------------------------------`);
  }

  static uncomplete(value){
    for(var i=0; i<jsonContent.length; i++){
      if(parseInt(value)-1 == jsonContent[i]._id){
        jsonContent[i]._done = false
      }
    }
    var write = JSON.stringify(jsonContent)
    fs.writeFileSync('data.json', write, 'utf8');
    console.log(`----------------------------------------`);
    console.log(`System note : One task set to uncomplete`);
    console.log(`----------------------------------------`);

}
}

class Task {
  constructor(property){
    this._id = property['id']
    this._note = property['note']
    this._done = property['done']
  }

  set id(value){this._id = value}
  get id(){return this._id}
  set note(value){this._note = value}
  get note(){return this._note}
  set done(value){this._done = value}
  get done(){return this._done}

}

var args = process.argv
if(args[2] === 'help'){
  Interface.clearscreen()
  Todo.help()
  Interface.newLines(1)
  Todo.mainMenu()
} else if(args[2] === 'list'){
  Interface.clearscreen()
  Todo.list()
  Interface.newLines(1)
  Todo.mainMenu()
} else if(args[2] === 'task'){
  Interface.clearscreen()
  Todo.task(args[3])
  Todo.list()
  Interface.newLines(1)
  Todo.mainMenu()
} else if(args[2] === 'add'){
  Interface.clearscreen()
  Todo.add(args.slice(3,args.length))
  Todo.list()
  Interface.newLines(1)
  Todo.mainMenu()
} else if(args[2] === 'delete'){
  Interface.clearscreen()
  Todo.delete(args[3])
  Todo.list()
  Interface.newLines(1)
  Todo.mainMenu()
} else if(args[2] === 'complete'){
  Interface.clearscreen()
  Todo.complete(args[3])
  Todo.list()
  Interface.newLines(1)
  Todo.mainMenu()
} else if(args[2] === 'uncomplete'){
  Interface.clearscreen()
  Todo.uncomplete(args[3])
  Todo.list()
  Interface.newLines(1)
  Todo.mainMenu()
} else{
  Interface.clearscreen()
  Todo.mainMenu()
}
