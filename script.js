
var tasks = []; 
var edit_btn = '';
var checkbox = '';
var delete_btn = ''; // присваевае позже так как сейчас не существует.

function deleteTask() {
	for(let i = 0; i < delete_btn.length; i++) {
		delete_btn[i].addEventListener('click', function(e) {
			let id = e.target.parentNode.getAttribute('data-id');

			tasks.splice(tasks.findIndex(function(o){
			    return o.id == id;
			}), 1);

			drawList();
			save();


		});
	}
}

function editTask() {
	for(let i = 0; i < edit_btn.length; i++) {
		edit_btn[i].addEventListener('click', function(e) {

				let parent = e.target.parentNode;
				let task = parent.querySelectorAll('span')[0];

				if(e.target.innerHTML == 'SAVE' && task.innerHTML != '') {

					parent.style.backgroundColor = '';
					e.target.innerHTML = 'EDIT';
					task.contentEditable = false;
					e.target.style.backgroundColor = '';
					e.target.style.fontWeight = '';
					e.target.style.color = '';


					let id = e.target.parentNode.getAttribute('data-id');
					let editedTask = tasks[tasks.findIndex(function(o){return o.id == id;})]
					
					editedTask.task = task.innerHTML;

					save();

				}

				else {

					parent.style.backgroundColor = '#ededed';

					task.contentEditable = true;

					task.focus();
					e.target.innerHTML = 'SAVE';
					e.target.style.backgroundColor = '#81c784';
					e.target.style.fontWeight = 'bold';
					e.target.style.color = 'white';
				}
		});
	}
}


function completeTask(e) {

	let id = e.parentNode.getAttribute('data-id');
	let completedTask = tasks[tasks.findIndex(function(o){return o.id == id;})];

    if(e.checked == true){

        e.parentNode.classList.add('completed');
        e.parentNode.querySelectorAll('button')[0].disabled = true;

		completedTask.completed = 'true';

		save();



    }else{
       e.parentNode.classList.remove('completed');
	   e.parentNode.querySelectorAll('button')[0].disabled = false;

	   completedTask.completed = 'false';
	   save();


    }
}

window.onload = function() {
	tasks = JSON.parse(localStorage.tasks); // загружает данные с localStorage в переменну так как localStorage поддерживает только строки

	drawList();
	console.log(localStorage.tasks);


	delete_btn = document.querySelectorAll('#remove_btn');
	edit_btn = document.querySelectorAll('#edit_btn');
	checkbox = document.querySelectorAll('#checkbox');
};



// отрисовывает задания
function drawList() {

	(function deleteChild() { 
		        
		        var child = todo_list.lastElementChild;  
		        while (child) { 
		            todo_list.removeChild(child); 
		            child = todo_list.lastElementChild; 
		        } 
	})();

	for(let i = 0; i < tasks.length; i++) {
		todo_list.innerHTML += `<li  data-id="${tasks[i].id}" data-completed="${tasks[i].completed}"> <input type="checkbox" id="checkbox" onchange="completeTask(this)""><span>${tasks[i].task}</span> <button id="edit_btn">EDIT</button> <button id="remove_btn">DELETE</button></li>`;
	}

	let items = todo_list.querySelectorAll('li').forEach(function(elem) {
		console.log(elem);

		let completed = elem.getAttribute('data-completed');

		if(completed == 'true') {


			elem.querySelector('#checkbox').checked = true;
      	 	elem.classList.add('completed');
       		elem.querySelectorAll('button')[0].disabled = true;

		} else {
			return false;
		}
	});


	delete_btn = document.querySelectorAll('#remove_btn');
	edit_btn = document.querySelectorAll('#edit_btn');

	//регистрация функций
	deleteTask();
	editTask();
	completeTask();


}


//добавляет элемент в localStorage и переменную tasks
function addItem() {
	tasks.push({'id': Math.floor(Math.random() * 99999999) + 1, 'task': todo_input.value, 'completed': 'false'});
	save();
	todo_input.value='';
	drawList();
	console.log(JSON.parse(localStorage.tasks));
}

function save() {
    window.localStorage.tasks = JSON.stringify(tasks);
 }


todo_submit.addEventListener('click', function() {
	if(todo_input.value) {
		addItem();
	}
});










