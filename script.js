
var tasks = []; 
var completed_tasks = ['Check mailboxes', 'Buy some carrot'];
var edit_btn = '';
var delete_btn = ''; // присваевает значине на 14 строке так как сейчас не существует.

function deleteTask() {

	for(let i = 0; i < delete_btn.length; i++) {
		delete_btn[i].addEventListener('click', function(e) {
			console.log('delete');
			let id = e.target.parentNode.getAttribute('data-id');

			tasks.splice(tasks.findIndex(function(o){
			    return o.id == id;
			}), 1);

			drawList();
			store();


		});
	}
}

function editTask() {
	for(let i = 0; i < edit_btn.length; i++) {
		edit_btn[i].addEventListener('click', function(e) {
				console.log('edit clicked');	

				let parent = e.target.parentNode;
				let task = parent.querySelectorAll('span')[0];

				if(e.target.innerHTML == 'SAVE') {
					e.target.innerHTML = 'EDIT';
					task.contentEditable = false;

					let id = e.target.parentNode.getAttribute('data-id');
					let editedTask = tasks[tasks.findIndex(function(o){return o.id == id;})]
					
					editedTask.task = task.innerHTML;

					store();

				}

				else {

					task.contentEditable = true;
					task.focus();
					e.target.innerHTML = 'SAVE';
				}


		});
	}
}

window.onload = function() {
	tasks = JSON.parse(localStorage.tasks); // загружает данные с localStorage в переменну так как localStorage поддерживает только строки

	drawList();
	console.log(localStorage.tasks);


	delete_btn = document.querySelectorAll('#remove_btn');
	edit_btn = document.querySelectorAll('#edit_btn');
	console.log(delete_btn);


	deleteTask();
	editTask();


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
		todo_list.innerHTML += `<li  data-id="${tasks[i].id}"> <input type="checkbox"><span>${tasks[i].task}</span> <button id="edit_btn">EDIT</button> <button id="remove_btn">DELETE</button></li>`;
	}

	delete_btn = document.querySelectorAll('#remove_btn');
	edit_btn = document.querySelectorAll('#edit_btn');
	editTask();
	deleteTask();


}


//добавляет элемент в localStorage и переменную tasks
function addItem() {
	tasks.push({'id': Math.floor(Math.random() * 99999999) + 1, 'task': todo_input.value});
	store();
	todo_input.value='';
	drawList();
	console.log(JSON.parse(localStorage.tasks));
}

function store() {
    window.localStorage.tasks = JSON.stringify(tasks);
 }


todo_submit.addEventListener('click', function() {
	if(todo_input.value) {
		addItem();
	}
});










