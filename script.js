// script.js

document.addEventListener('DOMContentLoaded', () => {
    class Task {
        constructor(description, priority) {
            this.description = description;
            this.priority = priority;
        }

        toString() {
            return `${this.description} (Priority: ${this.priority})`;
        }
    }

    class TaskList {
        constructor(element) {
            this.element = element;
            this.tasks = [];
        }

        addTask(task) {
            this.tasks.push(task);
            this.render();
        }

        render() {
            this.element.innerHTML = '';
            this.tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.toString();
                this.element.appendChild(li);
            });
        }
    }

    class TaskStack extends TaskList {
        constructor(element) {
            super(element);
        }

        addTask(task) {
            this.tasks.push(task);
            this.render();
        }

        removeTask() {
            this.tasks.pop();
            this.render();
        }
    }

    class TaskQueue extends TaskList {
        constructor(element) {
            super(element);
        }

        addTask(task) {
            this.tasks.push(task);
            this.render();
        }

        removeTask() {
            this.tasks.shift();
            this.render();
        }
    }

    class TaskHeap {
        constructor(element) {
            this.element = element;
            this.tasks = [];
        }

        addTask(task) {
            this.tasks.push(task);
            this.tasks.sort((a, b) => a.priority - b.priority);
            this.render();
        }

        removeTask() {
            this.tasks.shift();
            this.render();
        }

        render() {
            this.element.innerHTML = '';
            this.tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.toString();
                this.element.appendChild(li);
            });
        }
    }

    const taskList = new TaskList(document.getElementById('taskList'));
    const taskStack = new TaskStack(document.getElementById('taskStack'));
    const taskQueue = new TaskQueue(document.getElementById('taskQueue'));
    const taskHeap = new TaskHeap(document.getElementById('taskHeap'));

    document.getElementById('addTaskButton').addEventListener('click', () => {
        const description = document.getElementById('taskDescription').value;
        const priority = document.getElementById('taskPriority').value;

        if (description && priority) {
            const task = new Task(description, priority);
            taskList.addTask(task);
            taskStack.addTask(task);
            taskQueue.addTask(task);
            taskHeap.addTask(task);

            document.getElementById('taskDescription').value = '';
            document.getElementById('taskPriority').value = '';
        }
    });
});
