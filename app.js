function addTask() {
  const taskInput = document.getElementById('new-task');
  const categoryInput = document.getElementById('task-category');
  const dueDateInput = document.getElementById('task-due-date');

  if (taskInput.value.trim() === '') {
    return; // Do not add empty tasks
  }

  const taskText = taskInput.value.trim();
  const category = categoryInput.value;
  const dueDate = dueDateInput.value;

  const taskItem = document.createElement('li');
  const taskContent = `${taskText} [${category}] - ${dueDate}`;

  taskItem.appendChild(document.createTextNode(taskContent));

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = function() {
    editTask(taskItem, taskText, category, dueDate);
  };

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function() {
    taskItem.remove();
  };

  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  document.getElementById('task-list').appendChild(taskItem);

  taskInput.value = '';
  categoryInput.value = 'work';
  dueDateInput.value = '';
}

function toggleTaskComplete() {
  this.classList.toggle('completed');
}

module.exports = { addTask, toggleTaskComplete };

function editTask() {
    const currentText = this.firstChild.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            this.firstChild.textContent = input.value;
            this.removeChild(input);
        }
    });
    this.insertBefore(input, this.firstChild);
    input.focus();
}

document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task-button');
    const newTaskInput = document.getElementById('new-task');

    addTaskButton.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addTask, toggleTaskComplete, editTask };
}