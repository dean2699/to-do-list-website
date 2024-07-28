function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const taskCategory = document.getElementById('task-category');

    const taskText = newTaskInput.value.trim();
    const category = taskCategory.value;
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${taskText} [${category}]`;
        taskItem.addEventListener('click', toggleTaskComplete);
        taskItem.addEventListener('dblclick', editTask);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            taskList.removeChild(taskItem);
        });

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        newTaskInput.value = '';
        newTaskInput.focus();
    }
}

function toggleTaskComplete() {
    this.classList.toggle('completed');
}

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

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addTask, toggleTaskComplete, editTask };
}