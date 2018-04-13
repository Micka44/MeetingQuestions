import {Todo} from "./todo";
import {Store} from "./store";

export class Controller {

    constructor() {
        this.store = new Store(() => this.refreshCounterAndList());
        this.getElements();
        this.addListenners();
        this.initList();
    }

    getElements() {
        this.mainSection = document.querySelector('.main');
        this.newTodoInput = document.querySelector('.new-todo');
        this.todoList = document.querySelector('.todo-list');
        this.btnFilterAll = document.querySelector('.filter-all');
        this.btnFilterCompleted = document.querySelector('.filter-completed');
        this.itemLeft = document.querySelector('.todo-count');
    }

    addListenners() {
        this.newTodoInput.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                const todo =  new Todo({
                    content: this.newTodoInput.value
                });

                this.addTodo(todo);
                this.newTodoInput.value = '';
            }
        });

        this.btnFilterAll.addEventListener('click', (e) => this.filterTodo(e.target, 'all'));
        this.btnFilterCompleted.addEventListener('click', (e) => this.filterTodo(e.target, 'completed'));
    }

    initList() {
        const todos = this.store.getAllTodos();
        todos.forEach(t => this.addTodo(t));
        this.refreshCounterAndList();
    }

    refreshCounterAndList() {
        const todos = this.store.getAllTodos();

       this.mainSection.style.display = todos.length > 0 ? 'block' : 'none';
       this.itemLeft.innerText = todos.length + ' question' + (todos.length > 1 ? 's' : '') + ' posé' + (todos.length > 1 ? 'es' : '');



    }

    addTodo(todo) {
      if (/\S/.test(todo.content))
      {
          let li = document.createElement('li');
          li.setAttribute('data-id', todo.id);

          let input = document.createElement('input');
          input.type = 'checkbox';
          input.classList.add('toggle');
          input.addEventListener('click', () => this.toggleTodo(todo.id));

          if (todo.checked) {
              input.setAttribute('checked', 'checked');
              li.classList.add('completed');
          }

          let label = document.createElement('label');
          label.innerText = todo.content;
          label.addEventListener('dblclick', () => this.editTodo(todo));

          let button = document.createElement('button');
          button.classList.add('destroy');
          button.addEventListener('click', () => this.removeTodo(todo.id));

          //li.appendChild(input);
          li.appendChild(label);
          li.appendChild(input);
          li.appendChild(input);
          //li.appendChild(button);

          this.todoList.appendChild(li);
          this.store.addTodo(todo);
      }
    }

    filterTodo(element, filter) {
        document.querySelectorAll(".filters a").forEach(el => {
            if (el === element) {
                el.classList.add('selected');
            } else {
                el.classList.remove('selected');
            }
        });

        switch (filter) {
            case 'all':
                this.todoList.querySelectorAll("li").forEach(el => el.style.display = 'block');
                break;

            case 'active':
              //this case is dead code
                this.todoList.querySelectorAll("li").forEach(el => {
                    if (el.classList.contains('completed')) {
                        el.style.display = 'none'
                    } else {
                        el.style.display = 'block'
                    }
                });
                break;

            case 'completed':
                this.todoList.querySelectorAll("li").forEach(el => {
                    if (el.classList.contains('completed')) {
                        el.style.display = 'block'
                    } else {
                        el.style.display = 'none'
                    }
                });

                break;

            default:
                console.log("error, filter not defined");
                break;
        }
    }

    toggleTodo(id) {
        let li = this.todoList.querySelector("li[data-id='" + id + "']");
        let isChecked = this.store.toggleTodo(id);

        if (isChecked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
    }

    editTodo(todo) {
        let li = this.todoList.querySelector("li[data-id='" + todo.id + "']");
        li.classList.add('editing');

        let input = document.createElement('input');
        input.classList.add('edit');
        input.value = todo.content;
        input.addEventListener('blur', (e) => this.stopEditing(todo.id, e.target.value));
        input.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                this.stopEditing(todo.id, e.target.value)
            }
        });

        li.appendChild(input);
        li.querySelector('.edit').focus();
    }

    stopEditing(id, newContent) {
        let li = this.todoList.querySelector("li[data-id='" + id + "']");
        li.classList.remove('editing');
        li.querySelector('.edit').remove();

        if (/\S/.test(newContent)){
          li.querySelector('label').innerText = newContent;
          this.store.editTodo(id, newContent);
        }
        else {
          this.removeTodo(id);
        }

    }

    removeTodo(id) {
        this.todoList.querySelector("li[data-id='" + id + "']").remove();
        this.store.removeTodo(id);
    }
}
