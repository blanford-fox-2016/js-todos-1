'use strict'

// The necessary library or module for running the program
const fs = require('fs');
const rl = require('readline');
const jsonfile = require('jsonfile');

//Outside file
const file = './data.json';

// the variable that is used entire program
// mutable statwe
let input = process.argv.splice(2);


switch (input[0]) {
  case "add":
    //write and update the data.json
    let add_result = arrayToObject(input)
    jsonfile.writeFileSync(file, add_result);
    break;
  case "list":
    let json = jsonfile.readFileSync(file);
    console.log("__________________________________________");
    console.log("ID  |     DONE     |      TASK   ");
    console.log("``````````````````````````````````````````");
    // see the data of data.json and present it with desired format
    display(json);
    break;
  case "delete":
    let delete_result = jsonfile.readFileSync(file);
    // call the delete function
    deletion(delete_result, input[1]);
    jsonfile.writeFileSync(file, delete_result);
    break;
  case "complete":
    //see only the tasks which has competed task
    let complete_list = jsonfile.readFileSync(file);
    done(complete_list, input[1]);
    jsonfile.writeFileSync(file, complete_list);
    break;
  default:
    // print the help;
    console.log("####   TO DO LIST HELP   ####");
    console.log("------------------------------------");
    console.log("$ node todo.js");
    console.log("$ node todo.js list");
    console.log("$ node todo.js add <task_content>");
    console.log("$ node todo.js task <task_id>");
    console.log("$ node todo.js delete <task_id>");
    console.log("$ node todo.js complete <task_id>");
    console.log("$ node todo.js uncomplete <task_id>");
}



// Auxilary Function

// function that translate array to object
function arrayToObject(arr) {
  var temp = [];
  for (var i = 0; i < arr.length; i += 1)
    temp[i] = {
      id: i,
      task: arr[i],
      complete: "incomplete"
    }
  return temp;
}

//function that display the current list on data.json with the desire format
function display(json){
  for(var i = 1; i < json.length; i+=1 ){
    console.log( json[i]["id"] + ".  |  " + json[i]["complete"] + "  | " + json[i]["task"])
  }
}

//function delete
function deletion(arr, index) {
  return arr.splice(index,1);
}

// function update()
function done(obj, idx) {
  return obj[idx]["complete"] = "complete  ";
}
