const fs = require('fs');

class Data {
  static getAllData() {
    let listToDo = fs.readFileSync('data.json');
    return JSON.parse(listToDo);
  }

  static complete(id) {
    let newData = this.getAllData();
    let tobecompleted = newData[id-1];
    tobecompleted.completed = "x";
    tobecompleted.time_completed = Date();
    newData[id-1] = tobecompleted;

    fs.writeFile("data.json", JSON.stringify(newData), "utf8", (err) => {
      if (err) {
        console.log("Error, failed to update data!");
      }
      else {
        console.log("Data updated successfully!");
      }
    });
  }

  static uncomplete(id) {
    let newData = this.getAllData();
    let tobecompleted = newData[id-1];
    tobecompleted.completed = " ";
    tobecompleted.time_completed = "not completed yet";
    newData[id-1] = tobecompleted;

    fs.writeFile("data.json", JSON.stringify(newData), "utf8", (err) => {
      if (err) {
        console.log("Error, failed to update data!");
      }
      else {
        console.log("Data updated successfully!");
      }
    });
  }

  static pushData(task) {
    let realynew = this.getAllData();
    realynew.push(new ToDo({
      'task' : task
    }));
    return realynew;
  }

  static writeData(task) {
    let toSaved = this.pushData(task);
    fs.writeFile("data.json", JSON.stringify(toSaved), "utf8", (err) => {
      if (err) {
        console.log("Failed to add data!");
      } else {
        console.log("Data added successfully!");
      }
    })
  }

  static delData(id) {
    let deleted = this.getAllData();
    deleted.splice((id-1), 1);

    fs.writeFile("data.json", JSON.stringify(deleted), "utf8", (err) => {
      if (err) {
        console.log(`Failed to delete data with id ${id}!`);
      } else {
        console.log(`Data with id ${id} deleted successfully!`);
      }
    })
  }
}
//

class ToDo {
  constructor(args={}) {
    this.task = args['task'];
    this.completed = args['completed'] || " ";
    this.date = args['date'] || Date();
    this.time_completed = args['date'] || "not completed yet";
  }

  help() {
    console.log("=== TAMVAN TO-DO-LIST === \n");
    console.log("'node todo.js help' - for help");
    console.log("'node todo.js list' - to show all of to-do list");
    console.log("'node todo.js add <task_content>' - to add new task content");
    console.log("'node todo.js delete <task_id>' - to delete a task");
    console.log("'node todo.js complete <task_id>' - to mark a task as a completed task");
    console.log("'node todo.js uncomplete <task_id>' - to mark a task as a uncompleted task");
  }

  list() {
    let listToDo = Data.getAllData();
    console.log("id | task | completed | added at | finishe at ");
    for (var i = 0; i < listToDo.length; i++) {
      console.log(`${i+1}. ${listToDo[i].task} - [${listToDo[i].completed}] - ${listToDo[i].date} - ${listToDo[i].time_completed}`);
    }
  }

}



let todo = new ToDo();

// console.log(Data.pushData("Tetap semangat"));

// Data.writeData("Terus berjuang");

// Data.delData(2);

process.argv.forEach((val) => {
    process.argv.splice(0,2);
    let cmd = process.argv.splice(0,1).join("");
    let arg = process.argv.join(" ");

    if (cmd == "list") {
        todo.list();
    }
    else if (cmd == "help" || cmd == "") {
      todo.help();
    }
    else if (cmd == "add" && arg != "") {
      Data.writeData(arg);
    }
    else if (cmd == "delete" && isNaN(arg) == false) {
      Data.delData(arg);
    }
    else if (cmd == "complete" && isNaN(arg) == false) {
      Data.complete(arg);
    }
    else if (cmd == "uncomplete" && isNaN(arg) == false) {
      Data.uncomplete(arg);
    }
    else {
      todo.help();
    }
    // switch (cmd) {
    //   case "list":
    //     todo.list();
    //     break;
    //   case "help":
    //     todo.help();
    //     break;
    //   case "completed":
    //     Data.completed(arg);
    //   case "add":
    //     Data.writeData(arg);
    //     break;
    //   case "delete":
    //     Data.delData(arg);
    //   default:
    //     ;
    // }

});


// console.log(Data.getAllData());
// console.log(Data.updateData());
