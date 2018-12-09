// Tüm Elementleri Seçme 
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // Tüm eventListenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodoToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}

function clearAllTodos(e){
        //Arayüzden kaldırma 

        if (confirm("silmek istedğine eminmisin ?? ")){
                while(todoList.firstElementChild != null){
                    todoList.removeChild(todoList.firstElementChild);
                }
                localStorage.removeItem("todos");

        }

}

function filterTodos(e){
    const filtervalue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem){
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filtervalue)=== -1 ){
            listItem.setAttribute("style","display : none !important");

        }
        else{
            listItem.setAttribute("style","display : block ");
        }
    })
}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        showAlert("success","Başarı ile Sildiniz.");
    }
}
function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1); // Arrayden Değer silme 

        }

    })

    localStorage.setItem("todos",JSON.stringify(todos));

}

function loadAllTodoToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}
function addTodo(e){
    const newTodo = todoInput.value.trim();

    if (newTodo === ""){

        
        showAlert("danger","Lütfen boş bırakmayın");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);

        showAlert("success","Başarı ile eklendi");
    }

    e.preventDefault();
}
function getTodosFromStorage(){ // Storageden Todoları alacak 
    let todos;

    if(localStorage.getItem("todos")=== null ){
        todos =[];

    }
    else{
        todos =JSON.parse(localStorage.getItem("todos"));

    }

    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
    

}
function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;
   
    firstCardBody.appendChild(alert);
    //Set Time-out

    setTimeout(function(){
        alert.remove();
    },1500);
}

function addTodoToUI(newTodo){ // String Değerini list item olarak UI'ye ekleyecek..
  
    // List İtem  oluşturma 
    const listItem = document.createElement("li");
    // link oluşturma 
    const link = document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML = "<i class ='fa fa-remove'></i>";

    listItem.className="list-group-item d-flex justify-content-between";
   
   listItem.appendChild(document.createTextNode(newTodo));
   listItem.appendChild(link);

   // Todoliste ListItem ekleme 

    todoList.appendChild(listItem);

    console.log(listItem);

    todoInput.value="";

}