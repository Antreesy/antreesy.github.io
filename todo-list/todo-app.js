(function(){

  // heading
  function createTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  //fill form
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let btnWrapper = document.createElement('div');
    let btn = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = "Что будем делать?";
    btnWrapper.classList.add('input-group-append');
    btn.classList.add('btn', 'btn-primary');
    btn.textContent = 'Добавить'
    btn.setAttribute('disabled', 'true'); 

    btnWrapper.append(btn);
    form.append(input);
    form.append(btnWrapper);

    return {
      form,
      input,
      btn,
    };
  }

  //todo list
  function createTodoList () {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  //todo item
  function createTodoItem (objectNameDone = {name: '', done: 'false'}) {
    let item = document.createElement('li');
    let btnGroup = document.createElement('div');
    let btnDone = document.createElement('button');
    let btnDelete = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = objectNameDone.name;

    btnGroup.classList.add('btn-group', 'btn-group-sm');
    btnDelete.classList.add('btn', 'btn-danger');
    btnDelete.textContent = 'Удалить';
    btnDone.classList.add('btn', 'btn-success');
    btnDone.textContent = 'Готово';

    btnGroup.append(btnDone);
    btnGroup.append(btnDelete);
    item.append(btnGroup);

    return {
      item,
      btnDone,
      btnDelete,
    }
  }

  //array updating with Done/Delete
  function toggleItem(data, object) {
    for (i in data) {
      if (data[i].name === object.name) {
        object.done = !object.done;
        data[i].done = object.done;
        break;
      }
    }
  }
  function removeItem(data, object) {
    for (i in data) {
      if (data[i].name === object.name) {
        data.splice(i,1)
        break;
      }
    }
  }

  //import data from localStorage and interpret to array
  function importFromStorage(storageKey) {
    let storageRaw = localStorage.getItem(storageKey);
    console.log('from storage =',storageRaw);

    let dataRaw = [];
    let dataImport = [];
    JSON.parse(storageRaw, function(id,value) {
      dataRaw.push({id:id, value:value});
    })
    for (i=0; i<dataRaw.length-1; i+=3) {
      dataImport.push({name:dataRaw[i].value,done:dataRaw[i+1].value});
    }
    return dataImport;
  }

  //export data to localStorage
  function exportToStorage(storageKey, data) {
    let storageValue = JSON.stringify(data);
    localStorage.setItem(storageKey,storageValue);
    console.log('to storage =',storageValue);
  }

  function createTodoApp(container, title, data = [
            { name: 'Default task 1', done: false },
            { name: 'Default task 2', done: true },
            { name: 'Default task 3', done: false },
          ]) {
      
      //insert app in HTML
    let appTitle = createTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    container.append(appTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    //check if we have localStorage or default data array
    let storageKey = container.getAttribute('id');
    if (importFromStorage(storageKey) == '') {
      console.log('not in memory')
    } else {
      data = importFromStorage(storageKey)
    }

    //insert items from data
    for (i in data) {
      let todoItem = createTodoItem(data[i])
      let object = {name: data[i].name, done: data[i].done}

      todoList.append(todoItem.item)
      if (data[i].done) {todoItem.item.classList.add('list-group-item-success')}

      //assign buttons
      todoItem.btnDone.addEventListener('click', function() {
        todoItem.item.classList.toggle('list-group-item-success');
        toggleItem(data, object);
        exportToStorage(storageKey, data);
      });
      todoItem.btnDelete.addEventListener('click', function(){
          if(confirm('Вы уверены?')) {
            removeItem(data, object);
            todoItem.item.remove();
            exportToStorage(storageKey, data);
          };
      });
    }

    //disable submit button
    todoItemForm.input.addEventListener('keyup', function(e) {
      if (todoItemForm.input.value !== '') {todoItemForm.btn.removeAttribute('disabled')}
      else {todoItemForm.btn.setAttribute('disabled', 'true')}
    })

    // add new item
    todoItemForm.form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!todoItemForm.input.value) {
        return;
      }
      let object = {name: todoItemForm.input.value, done: false}
      let todoItem = createTodoItem(object)

      //assign buttons
      todoItem.btnDone.addEventListener('click', function() {
        todoItem.item.classList.toggle('list-group-item-success');
        toggleItem(data, object);
        exportToStorage(storageKey, data);
      });
      todoItem.btnDelete.addEventListener('click', function(){
        if(confirm('Вы уверены?')) {
          removeItem(data, object);
          todoItem.item.remove();
          exportToStorage(storageKey, data);
        };
      });

      //insert item in HTML, data, localStorage
      todoList.append(todoItem.item)
      data.push({name: todoItemForm.input.value, done: false})
      exportToStorage(storageKey, data);
      
      //reset inputForm
      todoItemForm.input.value = ''
      todoItemForm.btn.setAttribute('disabled', 'true');
    });
  }
  window.createTodoApp = createTodoApp;
})();