document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task-button');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            const taskItem = document.createElement('li');
            taskItem.textContent = taskText;
            taskItem.addEventListener('click', toggleTaskComplete);

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
});
