import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const data = {
    todos: [],
    todoInput: '',
    error: '',
}

const methods = {
    addNewTodo() {
        if (!this.todoInput) return this.error = 'Preencha o formulario antes de criar a tarefa!';

        if (this.error) this.error = '';

        const todoObject = {
            id: this.todos.length + 1,
            title: this.todoInput,
            finished: false
        };

        const todoListParsedToArray = JSON
            .parse(localStorage.getItem('todos'));

        todoListParsedToArray
            .push(todoObject);

        this.todos = todoListParsedToArray;
        this.todoInput = '';
    },
    removeTodo(event) {
        const todoHtmlElement = event.target.parentNode.parentNode;
        const idTodo = parseInt(todoHtmlElement.dataset.id) - 1;

        let todoIndex;

        this.todos.forEach((value, index) => {
            if (value.id === idTodo) todoIndex = index;
        });

        this.todos.splice(todoIndex, 1);
    },
    finishTodo(event) {
        const todoHtmlElement = event.target.parentNode.parentNode;
        const idTodo = parseInt(todoHtmlElement.dataset.id);

        this.todos.forEach(value => value.id === idTodo ? value.finished = true : value);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

const watchers = {
    todos(value) {
        localStorage.setItem('todos', JSON.stringify(value));
        this.todos = value;
    }
}

const vm = new Vue({
    el: '#root',
    data,
    methods,
    watch: watchers,
    mounted() {
        if (localStorage.getItem('todos')) {
            const todosParsedToObject = JSON
                .parse(localStorage.getItem('todos'));

            this.todos = todosParsedToObject;
        } else {
            localStorage.setItem('todos', JSON.stringify([]));
        }
    },
});
