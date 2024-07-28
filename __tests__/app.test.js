const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Load HTML file into JSDOM
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const dom = new JSDOM(html);
global.document = dom.window.document;

// Import functions from app.js
const { addTask, toggleTaskComplete } = require('../app');

describe('To-Do List App', () => {
  beforeEach(() => {
    // Clear the task list before each test
    document.getElementById('task-list').innerHTML = '';
  });

  test('addTask adds a new task to the list', () => {
    document.getElementById('new-task').value = 'Test Task';
    addTask();

    const tasks = document.querySelectorAll('#task-list li');
    expect(tasks.length).toBe(1);
    expect(tasks[0].childNodes[0].nodeValue).toContain('Test Task');
  });

  test('addTask adds a new task with category to the list', () => {
    document.getElementById('new-task').value = 'Test Task';
    document.getElementById('task-category').value = 'work';
    addTask();

    const tasks = document.querySelectorAll('#task-list li');
    expect(tasks.length).toBe(1);
    expect(tasks[0].childNodes[0].nodeValue).toContain('Test Task [work]');
  });

  test('addTask adds a new task with due date to the list', () => {
    document.getElementById('new-task').value = 'Test Task';
    document.getElementById('task-category').value = 'work';
    document.getElementById('task-due-date').value = '2024-08-01';
    addTask();

    const tasks = document.querySelectorAll('#task-list li');
    const taskTextContent = tasks[0].childNodes[0].nodeValue; // Only check the text node
    expect(taskTextContent).toContain('Test Task [work] - 2024-08-01');
  });

  test('toggleTaskComplete toggles the completed class', () => {
    document.getElementById('new-task').value = 'Test Task';
    addTask();

    const task = document.querySelector('#task-list li');
    toggleTaskComplete.call(task);

    expect(task.classList.contains('completed')).toBe(true);

    toggleTaskComplete.call(task);

    expect(task.classList.contains('completed')).toBe(false);
  });
});