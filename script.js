(function toDo() {
  const form = document.querySelector('.new-task');
  const input = document.querySelector('.input-todo');
  const list = document.querySelector('.ul-todo');
  const clearCheck = document.querySelector('.clear-btn');
  const checkAllBtn = document.querySelector('.check-all-btn');
  const filter = document.querySelector('.filter-todo');
  const btnAll = document.querySelector('.all');
  const btnActive = document.querySelector('.active');
  const btnCompleted = document.querySelector('.completed');
  const buttonPage = document.querySelector('.button-page');
  const ENTER = 'Enter';
  const ESCAPE = 'Escape';

  const { _ } = window;
  let filtration = 'all';
  const pagination = { allPages: 0, currentPage: 0, limit: 5 };
  let todoList = [];

  const pageGeneration = () => {
    let button = '';
    let active = '';
    for (let i = 0; i < pagination.allPages; i += 1) {
      if (i === pagination.currentPage) active = 'active';
      button = `${button}<button class='page ${active} btn btn-info' data id=${i}>${i + 1}</button>`;
      active = '';
    }
    buttonPage.innerHTML = button;
  };

  const arrayFiltering = () => {
    let todoListFilter = [];
    let array = [];
    const buttonInterior = [btnActive, btnCompleted, btnAll];
    buttonInterior.forEach((element) => {
      element.classList.remove('btn-success');
    });
    switch (filtration) {
      case 'active':
        btnActive.classList.add('btn-success');
        todoListFilter = todoList.filter((todo) => !todo.checked);
        break;
      case 'completed':
        btnCompleted.classList.add('btn-success');
        todoListFilter = todoList.filter((todo) => todo.checked);
        break;
      default:
        btnAll.classList.add('btn-success');
        todoListFilter = todoList;
        break;
    }
    pagination.allPages = Math.ceil(todoListFilter.length / pagination.limit);
    array = todoListFilter.slice(
      pagination.currentPage * pagination.limit,
      (pagination.currentPage + 1) * pagination.limit,
    );
    if (!array.length && pagination.allPages > 0) {
      pagination.currentPage -= 1;
      array = todoListFilter.slice(
        pagination.currentPage * pagination.limit,
        (pagination.currentPage + 1) * pagination.limit,

      );
    }
    return array;
  };

  const render = () => {
    const todoListFilter = arrayFiltering();
    pageGeneration();
    let template = '';
    todoListFilter.forEach((todo) => {
      template += `<li id="${todo.id}" class='li-todo'>
    <input type="checkbox" class="check-input" ${todo.checked ? 'checked' : ''} />
    <span class='text-todo' >${_.escape(todo.text)}</span>
    <button name='deleteButton' class="btn btn-danger">x</button>
    </li>`;
    });
    const counterActive = todoList.filter((item) => !item.checked);
    const counterCompleted = todoList.filter((item) => item.checked);
    btnAll.innerHTML = `ALL  (${todoList.length})`;
    btnActive.innerHTML = `Active  (${counterActive.length})`;
    btnCompleted.innerHTML = `Completed  (${counterCompleted.length})`;

    list.innerHTML = template;
  };

  const addingTask = () => {
    const todo = {
      text: input.value,
      checked: false,
      id: Date.now(),
    };

    todoList.push(todo);
    pagination.currentPage = pagination.allPages;
    filtration = 'all';
    render();
  };

  const checkedTodo = (id) => {
    const index = todoList.findIndex((item) => item.id === id);
    todoList[index].checked = !todoList[index].checked;
    render();
  };

  const deleteTodo = (id) => {
    const index = todoList.findIndex((item) => item.id === id);
    todoList.splice(index, 1);
    render();
  };

  const checkAllTodo = () => {
    todoList.forEach((task) => {
      const item = task;
      item.checked = checkAllBtn.checked;
    });
    render();
  };

  const clearCheckTodo = () => {
    todoList = todoList.filter((todo) => !todo.checked);
    render();
  };

  const saveTodo = (event) => {
    const newText = event.target.value.trim();
    const editId = event.target.parentElement.id;
    const editTask = todoList.find((item) => item.id === Number(editId));
    if (event.key === ENTER && newText) {
      editTask.text = event.target.value;
      render();
    } else if (event.key === ESCAPE) {
      event.preventDefault();
      render();
    }
  };

  const blurChange = (event) => {
    const editId = event.target.parentElement.id;
    const editTask = todoList.find((item) => item.id === Number(editId));
    editTask.text = event.target.value;
    render();
  };

  const editTodo = (event) => {
    if (event.target.className === 'text-todo') {
      const newTask = event.target;
      const inputTask = document.createElement('input');
      inputTask.className = 'new-input-task';
      inputTask.id = event.target.id;
      inputTask.value = newTask.innerText;
      newTask.parentElement.replaceChild(inputTask, newTask);
      inputTask.focus();
      const newInputTask = document.querySelector('.new-input-task');
      inputTask.addEventListener('keyup', saveTodo);
      newInputTask.addEventListener('blur', blurChange);
    }
  };

  const filteringTask = (event) => {
    filtration = event.target.className;
    switch (filtration) {
      case 'active':
        filtration = 'active';
        break;
      case 'completed':
        filtration = 'completed';
        break;
      default:
        filtration = 'all';
        break;
    }
    pagination.currentPage = 0;
    render();
  };

  const selectPage = (event) => {
    pagination.currentPage = Number(event.target.id);
    render();
  };

  const submitForm = (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (text) {
      addingTask(text);
      input.value = '';
      input.focus();
    }
  };

  const handleClickDeleteOrCheck = (event) => {
    if (event.target.type === 'checkbox') {
      const itemKey = +event.target.parentElement.id;
      checkedTodo(itemKey);
    }
    if (event.target.className === 'text-todo' && event.detail === 2) editTodo(event);

    if (event.target.classList.contains('btn-danger')) {
      const itemKey = +event.target.parentElement.id;
      deleteTodo(itemKey);
    }
  };

  list.addEventListener('click', handleClickDeleteOrCheck);
  form.addEventListener('submit', submitForm);
  filter.addEventListener('click', filteringTask);
  checkAllBtn.addEventListener('click', checkAllTodo);
  clearCheck.addEventListener('click', clearCheckTodo);
  buttonPage.addEventListener('click', selectPage);
}());
