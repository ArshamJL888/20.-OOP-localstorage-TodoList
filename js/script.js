class Todo {
    constructor(title) {
        this.title = title;
        this.isCompleted = false;
    }
}

class TodoList {
    constructor(todoContainer) {
        this.todoArray = JSON.parse(localStorage.getItem('todolist')) ?? [];
        this.containerLocation = todoContainer;
        this.addBtn = document.querySelector('.addTolist');
        this.clearBtn = document.querySelector('.ClearAll');
        this.todoInput = document.querySelector('#todo-input');
        this.render(this.todoArray);
    }
    render(todos) {
        this.containerLocation.textContent = '';
        this.addBtn.addEventListener('click', () => {
            this.addNewTodo(todos)
        });
        this.clearBtn.addEventListener('click', () => {
            this.clearAll()
        });
        this.ShowListToDOM();
    }

    addNewTodo() {
        let newTodo = new Todo(this.todoInput.value);
        this.todoArray.push(newTodo)
        this.saveListToLocalstorage();
        this.ShowListToDOM();
        this.clearInput();
    }
    clearInput() {
        this.todoInput.value = '';
    }
    clearAll() {
        this.todoArray = [];
        this.saveListToLocalstorage();
        this.ShowListToDOM()
    }
    ShowListToDOM() {
        this.containerLocation.textContent = '';
        let newFragment = document.createDocumentFragment();
        this.todoArray.forEach(todo => {
            let newLi = document.createElement('li');
            newLi.classList.add('todo-item');

            let newLabel = document.createElement('label');
            newLabel.classList.add('todo-label');
           
            newLabel.innerHTML = todo.title;
            newLi.append(newLabel);

            let newDiv = document.createElement('div');
            newDiv.classList.add('todo-btns');

            let newCompleteBtn = document.createElement('button');
            newCompleteBtn.classList.add('todo-btn');
            newCompleteBtn.classList.add('complete');
            if(todo.isCompleted) {
                newLabel.classList.add('completed');
                newCompleteBtn.innerHTML = 'InComplete';
            }
            else {
                newLabel.classList.remove('completed');
                newCompleteBtn.innerHTML = 'Complete';
            }
            
            newCompleteBtn.addEventListener('click', (event) => {
                let index = this.todoArray.findIndex(todo => {
                    return todo.title === event.target.parentElement.previousElementSibling.innerHTML;
                })    
                this.todoArray[index].isCompleted = !this.todoArray[index].isCompleted
                this.saveListToLocalstorage()
                this.ShowListToDOM();
            })
            newDiv.append(newCompleteBtn);

            let newRemoveBtn = document.createElement('button');
            newRemoveBtn.classList.add('todo-btn');
            newRemoveBtn.classList.add('remove');
            newRemoveBtn.innerHTML = 'Remove';
            newRemoveBtn.addEventListener('click', (event) => {
                let index = this.todoArray.findIndex(todo => {
                    return todo.title === event.target.parentElement.previousElementSibling.innerHTML;
                })    
                this.todoArray.splice(index, 1);
                this.saveListToLocalstorage();
                this.ShowListToDOM();
                })
            newDiv.append(newRemoveBtn);

            newLi.append(newDiv);

            newFragment.append(newLi);
        });
        this.containerLocation.append(newFragment);
    }

    saveListToLocalstorage() {
        localStorage.setItem('todolist', JSON.stringify(this.todoArray))
    }
}

let todoContainer = document.querySelector('.main-list');

new TodoList(todoContainer);

