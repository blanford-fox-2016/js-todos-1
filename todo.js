//sync
const readline = require('readline');
var fs = require('fs');

var json = JSON.parse(fs.readFileSync('data.json', 'utf8'));


function writeJson(){
  var contents = fs.writeFileSync("data.json", JSON.stringify(json));
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

class TodoList {
  constructor(task) {
    this.taskId = json[json.length-1].id
    this.idTask = task
    this.kondisi = false;
  }
  static Display(){
    console.log("---------------------");
    console.log("1. node todo.js help ");
    console.log("2. node todo.js add <task_content>");
    console.log("3. node todo.js task <task_id>");
    console.log("4. node todo.js delete <task_id> ");
    console.log("5. node todo.js complete <task_id>");
    console.log("6. node todo.js uncomplete <task_id");
    console.log("7. node todo.js list");
    console.log("------------------------------");
  }

  seeAll(){
    for (var i = 0; i < json.length; i++) {
      if(json[i].status){
        console.log(`[x] ${json[i].task}`);
      }else {
        console.log(`[ ] ${json[i].task}`);
      }
    }

  }

  addTask(task){
    json.push({"id": this.taskId+=1, 'task': task, 'status': this.kondisi ,})
    console.log("Silahkan ubah status menjadi complete menggunakan perintah ke 5");
    writeJson()
  }

  complete(id){
    var index = json.map(function(el) { return el.id; }).indexOf(Number(id));
    json[index].status = true;
    writeJson()
    // debugger;
  }

  uncomplete(id){
    var index = json.map(function(el) { return el.id; }).indexOf(Number(id));
    json[index].status = false;
    writeJson()
  }

  delete(id){
    var index = json.map(function(el) { return el.id; }).indexOf(Number(id));
    json.splice(index, 1)
    writeJson()
  }

  checktask(id){
    var index = json.map(function(el) { return el.id; }).indexOf(Number(id));
    console.log(json[index].task);
  }
}

//

//console.log(json[json.indexOf("")]);
//json argv
//
var testing = new TodoList();
// console.log(json);

process.argv.forEach((val, index, array) => {

  if (index === 1) {
    TodoList.Display()
  }
  if(index > 1) {
    if(val === "list") {
      testing.seeAll()
    } else if (val === "add" ) {
      testing.addTask( array[3] )
      // process.exit(-1)
    }else if(val === "complete"){
      testing.complete( Number(array[3]) )
      process.exit(-1)
    }else if(val === "uncomplete"){
      testing.uncomplete( array[3] )
      //process.exit(-1)
    }else if(val === "delete"){
      testing.delete( array[3] )
      //process.exit(-1)
    }else if(val === "task"){
      testing.checktask( array[3] )
      //process.exit(-1)
    }
  }
});
