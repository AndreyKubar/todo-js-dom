
const todoInput = document.querySelector('.new-todo');
const todoButton = document.querySelector('.add');
const todo = document.querySelector('.my-todo');
const filterOption = document.querySelector('.filter-todo');
let todoList = []


const displayTasks = () => {
  let displayTask = ''
  todoList.forEach(function(item, index){
    displayTask += `
    <li>
    <input type="checkbox" id="item_${index}" ${item.checked ? 'checked' : ''}>
    <label for="item_${index}">${item.todo}</label>
    </li>
    `
    todo.innerHTML = displayTask
  })
}


const addTodo = () => {
  let newTodo = {
    todo: todoInput.value,
    checked: false,
    important: false
  }
  if (todo === '') {
    return 
  }
  todoList.push(newTodo)
  displayTasks()
}

const changeTodo = (e) => {
  let idInput = e.target.getAttribute('id')
  let valueLabel = todo.querySelector('[for='+ idInput +']').innerHTML;

  todoList.forEach(function(item) {
    if (item.todo === valueLabel){
      item.checked = !item.checked
    }
  })


}



// const addTodo = (event) => {
//   event.preventDefault()

//   const todoDiv = document.createElement('div');
//   todoDiv.classList.add('todo')
//   console.log(todoDiv);

//   const newTodo = document.createElement('li')
//   newTodo.innerText = todoInput.value
//   newTodo.classList.add('todo-item')
//   todoDiv.appendChild(newTodo)
//   if(todoInput.value === ''){
//     return null
//   }


//   const completedButton = document.createElement('button');
//   completedButton.innerHTML = '<i class="fas fa-check"></i>';
//   completedButton.classList.add('complete_btn')
//   todoDiv.appendChild(completedButton);

//   const deleteButton = document.createElement('button');
//   deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
//   deleteButton.classList.add('delete_btn')
//   todoDiv.appendChild(deleteButton);

//   todoList.appendChild(todoDiv);

//   todoInput.value = ""
//   console.log(todoDiv);
// }









todo.addEventListener('change', changeTodo)
todoButton.addEventListener('click', addTodo)
// todoList.addEventListener('click', deleteCheck)
// filterOption.addEventListener('click', filterTodo)

