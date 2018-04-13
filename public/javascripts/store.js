export class Store {

    constructor(callback) {
        this.LSKEY_TODO = "todo-list";
        this.todoList = JSON.parse(window.localStorage.getItem(this.LSKEY_TODO)) || [];
        this.refreshCallback = callback;
    }

    addTodo(todo) {
        this.todoList.push(todo);
        this.refreshStorage();
    }

    editTodo(id, content) {
        this.todoList.forEach(t => {
            if (t.id === id) {
                t.content = content;
            }
        });
        this.refreshStorage();
    }

    removeTodo(id) {
        this.todoList = this.todoList.filter(t => t.id !== id);
        this.refreshStorage();
    }

    getAllTodos() {
        return this.todoList.slice(0);
    }

    clearAllCompleted() {
        this.todoList = this.todoList.filter(t => !t.checked);
        this.refreshStorage();
    }

    toggleTodo(id) {
        let isChecked = false;

        this.todoList.forEach(t => {
           if (t.id === id) {
               t.checked = !t.checked;
               isChecked = t.checked;
           }
        });

        this.refreshStorage();
        return isChecked;
    }

    refreshStorage() {
        window.localStorage.setItem(this.LSKEY_TODO, JSON.stringify(this.todoList));
        this.refreshCallback();
    }
}