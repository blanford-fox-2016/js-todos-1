var fs = require('fs');

let list = []

class Task {
	constructor(input){
		this.status = "[ ]"
		this.task = input;
	}
}

class Edit{
		static writeData(){
		fs.writeFile('data.json', JSON.stringify(list),function(err,data){})
	}
}

class Kumpulan{
	constructor(){
		list = JSON.parse(fs.readFileSync('data.json', 'utf8'))
	}

	addTask(input){
		list.push(new Task(input))
		Edit.writeData()
	}

	deleteTask(idx){
		list.splice(idx, 1)
		Edit.writeData()
	}

	completeTask(idx){
		list[idx].status = "[x]"
		Edit.writeData()
	}

	uncompleteTask(idx){
		list[idx].status = "[ ]"
		Edit.writeData()
	}

	showTask(){
		console.log("TO-DO LIST")
		for (let idx in list){
			console.log(`${idx}. ${list[idx].status} [${list[idx].task}]`)
		}
	}

	displayMenu(){
		console.log('1. menambah tugas. contoh: node todo.js add "belajar piano"')
		console.log("2. hapus tugas. contoh: node todo.js delete <indeks tugas>")
		console.log("3. menampilkan tugas. contoh: node todo.js show")
		console.log("4. tampilkan menu. contoh: node todo.js help")
		console.log("5. tandai tugas selesai. contoh: node todo.js complete <indeks tugas>");
		console.log("6. ubah tugas tidak selesai. contoh: node todo.js uncomplete <indeks tugas>");
	}

	start(){
		switch (process.argv[2]) {
			case "add":
				this.addTask(process.argv[3])
				break;
			case "delete":
				this.deleteTask(process.argv[3])
				break;
			case "show":
				this.showTask()
				break;
			case "help":
				this.displayMenu()
				break;
			case "complete":
				this.completeTask(process.argv[3])
				break;
			case "uncomplete":
				this.uncompleteTask(process.argv[3])
				break;
			default:
				this.displayMenu()
				break;
		}
	}
}

let tugas = new Kumpulan()
tugas.start()
