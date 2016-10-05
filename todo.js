'use strict'
// dataObject.push({'task':'doing nothing'})
// jsonfile.writeFileSync(file,dataObject)
const fs = require('fs')
const jsonfile = require('jsonfile')
var dataJson = fs.readFileSync('data.json','utf-8');
var dataObject = JSON.parse(dataJson);
var file = 'data.json';
var tampung_dataObject = ''

jsonfile.writeFileSync(file,dataObject)
process.argv.forEach((val,index,array)=>{
  switch (val) {
    case 'help':
    console.log("node todo.js help\nnode todo.js list\nnode todo.js add <task_content>\nnode todo.js task <task_id>\nnode todo.js delete <task_id>\nnode todo.js complete <task_id>\nnode todo.js uncomplete <task_id>");
    break;
    case 'list':
    for(var idx=0;idx<dataObject.length;idx++){
    tampung_dataObject += idx+1+". "+dataObject[idx].status+" "+dataObject[idx].task+"\n"
  }
  console.log(tampung_dataObject);
    break;
    case 'add':
    var tampung_string =""
    if(array.length >3){
      for(var i=3;i<array.length;i++){
        tampung_string +=" "+array[i]
      }
    }
    dataObject.push({'status':'[ ]','task':tampung_string})
    jsonfile.writeFileSync(file,dataObject)
    break;
    case 'task':
    if(array.length === 4)
    {
      console.log(array[3]);
      for(var i=0;i<=dataObject.length;i++){
      if(i.toString() === array[3]){
      console.log('=========== [ ] => Uncompleted [X] || => Completed ================');
      console.log(dataObject[i-1].status+" "+ dataObject[i-1].task);
    }
    }
  }
    break;
    case 'delete':
    if(array.length === 4){
      for(var i=0;i<array.length;i++)
      {
        if(i.toString() === array[3]){
          dataObject.splice(i-1,1)
        }
      }
    }
    jsonfile.writeFileSync(file,dataObject)
    break;
    case 'complete':
    if(array.length === 4){
      for(var i=0;i<=dataObject.length;i++)
      {
        if(i.toString() === array[3]){
        dataObject[i-1].status = '[X]'
        }
      }
    }
    jsonfile.writeFileSync(file,dataObject)
    break;
    case 'uncomplete':
    if(array.length === 4){
      for(var i=0;i<=dataObject.length;i++)
      {
        if(i.toString() === array[3]){
        dataObject[i-1].status = '[ ]'
        }
      }
    }
    jsonfile.writeFileSync(file,dataObject)
    break;
    default:

  }
})
