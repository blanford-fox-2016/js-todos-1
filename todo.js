"use strict"

var jsonfile = require('jsonfile')
var file = 'data.json'

var database  = jsonfile.readFileSync(file)
var tambah = []


process.argv.forEach((pilihan) => {
  if(pilihan === "list"){
      console.log(jsonfile.readFileSync(file))
  }else if(pilihan === "help"){
      console.log(`\n node todo.js list \n node todo.js add <task_content> \n node todo.js task <task_id> \n node todo.js delete <task_id> \n node todo.js complete <task_id> \n node todo.js uncomplete <task_id>`);
  }else if(pilihan === "add"){

      var newData = ''
      for(var i = 3 ; i < process.argv.length ; i++){
        newData += process.argv[i] + " "
      }
      var obj = {id:database[database.length-1].id+1, task: newData,status:"[ ]"}
      tambah = obj
      database.push(tambah)
      jsonfile.writeFileSync(file,database)
      console.log(`Add "${process.argv[3]}" ke Todo list`)
      console.log(jsonfile.readFileSync(file))
  }else if(pilihan === "task"){
    var index = (process.argv[3])
    for(var i = 0 ; i < database.length ; i++){
      if(index === String(database[i].id)){
        console.log(database[i]);
      }
    }
  }else if(pilihan === "delete"){
      var index = (process.argv[3])
      for(var i = 0 ; i < database.length ; i++){
        if(index === String(database[i].id)){
          console.log(`Hapus Data Task: ${database[i].task}`)
          database.splice(i,1)
          jsonfile.writeFileSync(file,database)
          console.log(jsonfile.readFileSync(file))
        }
      }
  }else if(pilihan === "complete"){
      var index = (process.argv[3])
      for(var i = 0 ; i < database.length ; i++){
        if(index === String(database[i].id)){
          database[i].status = "[X]"
          jsonfile.writeFileSync(file,database)
          //console.log(jsonfile.readFileSync(file))
          //console.log(`[x] ${database[i].task}`);
        }
        console.log(`${database[i].status} : ${database[i].task} `)
      }
  }else if(pilihan === "uncomplete"){
      var index = (process.argv[3])
      for(var i = 0 ; i < database.length ; i++){
        if(index === String(database[i].id)){
          database[i].status = "[ ]"
          jsonfile.writeFileSync(file,database)
        //  console.log(jsonfile.readFileSync(file))
          //console.log(`[ ] ${database[i].task}`);
        }
        console.log(`${database[i].status} : ${database[i].task} `)

      }
  }
});
