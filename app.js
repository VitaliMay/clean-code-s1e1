
const taskInput = document.querySelector(".task_new-task");
const addButton = document.querySelector(".button-edit_add");
const incompleteTaskHolder = document.querySelector(".list_todo");
const completedTasksHolder = document.querySelector(".list_completed");

//New task list item
const createNewTaskElement = function(taskString) {

  const listItem = document.createElement("li");
  listItem.className = "list-item";

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "list-item__status"
  checkBox.setAttribute("aria-label", "Task status");

  const label = document.createElement("label");
  label.textContent = taskString;
  label.className = 'task list-item__title';

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task list-item__text";
  editInput.setAttribute("aria-label", "Edit task");

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "button-edit";

  const deleteButton = document.createElement("button");
  deleteButton.className = "button-delete";
  deleteButton.setAttribute("aria-label", "Delete");

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.className = "button-delete__img"
  deleteButtonImg.setAttribute("alt", "Button-delete");
  deleteButtonImg.src = './remove.svg';

  deleteButton.append(deleteButtonImg);

  listItem.append(checkBox);
  listItem.append(label);
  listItem.append(editInput);
  listItem.append(editButton);
  listItem.append(deleteButton);

  return listItem;
}


const addTask = function() {

  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";
}

//Edit an existing task.

const editTask = function() {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector(".list-item__text");
  const label = listItem.querySelector(".list-item__title");
  const editBtn = listItem.querySelector(".button-edit");
  const containsClass = listItem.classList.contains("list-item_edit-mode");

  if (containsClass) {
    label.textContent = editInput.value;
    editBtn.textContent = "Edit";
  }
  else {
    editInput.value = label.textContent;
    editBtn.textContent = "Save";
  }

  listItem.classList.toggle("list-item_edit-mode");
};


//Delete task.
const deleteTask = function() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function() {
  const listItem = this.parentNode;
  completedTasksHolder.append(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}


addButton.addEventListener("click", addTask);


const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {

  const checkBox = taskListItem.querySelector(".list-item__status");
  const editButton = taskListItem.querySelector(".button-edit");
  const deleteButton = taskListItem.querySelector(".button-delete");

  // onclick automatically replaces the previous handler,
  // and there is no need to check for duplicates (when using addEventListener)
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i += 1){
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}


for (let i = 0; i < completedTasksHolder.children.length; i += 1){
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

