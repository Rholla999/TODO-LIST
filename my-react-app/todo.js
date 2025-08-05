const inputRef = document.getElementById('todoInput');
const todoListItem = document.getElementById('todoList');
const addBtn = document.getElementById('addBtn');
const delBtn = document.getElementById('clearBtn');
const countList = document.getElementById('count')




let itemsArray = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];


function updateCount() {
    countList.textContent = `Count: ${itemsArray.length}`;
}

itemsArray.forEach((item) => {
    // create a new li nd button from localStorage even on refresh

        const li = document.createElement('li');
        li.textContent = item;

        const delBtn = document.createElement('button');
        delBtn.textContent = 'x';
        delBtn.addEventListener('click', () => {
            const index = itemsArray.indexOf(item);
            if (index > -1) {
                itemsArray.splice(index, 1);
                 localStorage.setItem('listItem', JSON.stringify(itemsArray));
                 li.remove();
                 updateCount();
            }
        })
        li.appendChild(delBtn);

        // todoListItem.appendChild(li);
        todoListItem.insertBefore(li, todoListItem.firstChild);

});
updateCount();

function updateTodoApp() {
    const inputVal = inputRef.value.trim();
    if (inputVal) {
        itemsArray.push(inputVal);
        localStorage.setItem('listItem', JSON.stringify(itemsArray));

        const li = document.createElement('li');
        li.textContent = inputVal;
        // todoListItem.appendChild(li);
        todoListItem.insertBefore(li, todoListItem.firstChild);


        const delBtnName = ['x'];
        for (let i = 0; i < delBtnName.length; i++) {
            const delBtn = document.createElement('button');
            delBtn.textContent = delBtnName[i];

             li.appendChild(delBtn);
            delBtn.addEventListener('click', () => {
                const index = itemsArray.indexOf(inputVal);
                if (index > -1) {
                    itemsArray.splice(index, 1);
                    li.remove();
                     updateCount();
                } 
            })
        }
        inputRef.value = '';
    }
    updateCount();
}


addBtn.addEventListener('click', updateTodoApp);

inputRef.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        e.preventDefault();
        updateTodoApp();
        updateCount();
    }
})

delBtn.addEventListener('click', () => {
    localStorage.removeItem('listItem');
    itemsArray = [];
    todoListItem.innerHTML = '';
    updateCount();
})