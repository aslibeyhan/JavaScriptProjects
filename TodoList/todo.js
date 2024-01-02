//Tüm elementleri seçme
//not->her fonksiyon sadece bir iş yapsın.
//birçok yerde kullanabileceğin işleri bir fonsiyon yap , gerektiği yerde çağır.
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

//tüm eventleri listeler
function eventListeners(){
    form.addEventListener("submit",addTodo);
    //sayfa yüklendiğinde todoların ekleme
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    //todoları arayüzden silme
    secondCardBody.addEventListener("click",deleteTodo);

    //Todoları Filtreleme
    filter.addEventListener("keyup",filterTodos);

    //Tüm todoları temizleme
    clearButton.addEventListener("click",clearAllTodos);
}


function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğinize emin misiniz ?")){
      //Arayüzden todoları temizleme
      //todoList.innerHTML="";  //daha yavaş çalışır aşagıdaki metoda göre;
      while(todoList.firstElementChild!=null){
         todoList.removeChild(todoList.firstElementChild);
      }

      //LocalStorage dan da silelim. key değerini silmen yeterli
      localStorage.removeItem("todos");
    }
}

function filterTodos(e){
   const filterValue=e.target.value.toLowerCase();
   const listItems=document.querySelectorAll(".list-group-item");
  

   listItems.forEach(function(listItem){
      const text=listItem.textContent.toLowerCase();
      if(text.indexOf(filterValue)===-1){
         //Bulamadı 
         listItem.setAttribute("style","display :none !important");
      }
      else{
         listItem.setAttribute("style","display :block ");
      }
   });
}

function deleteTodo(e){
     if(e.target.className ==="fa fa-remove"){
      e.target.parentElement.parentElement.remove();
      //Todoları Storage dan silme
      deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

      showAlert("success","Todo başariyla silindi ")
     }
}

function deleteTodoFromStorage(deleteTodo){
      let todos=getTodosFromStorage();
      todos.forEach(function(todo,index){
         if(todo===deleteTodo){
            todos.splice(index,1);  //o index ten itibaren bir obje sil demek.
         }
      });
      localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
   let todos=getTodosFromStorage();
   todos.forEach(function(todo){
      addTodoToUI(todo);
   })

}

function addTodo(e){
    const newTodo=todoInput.value.trim();

 if(newTodo===""){
    showAlert("danger","Lütfen bir todo giriniz");
 }
 else{
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success","basariyla eklendi");
 }





    e.preventDefault();
}

//Storage dan tüm toodları almak

function getTodosFromStorage(){
   let todos;
   if(localStorage.getItem("todos")===null){
      todos=[];
   }
   else{
      todos=JSON.parse(localStorage.getItem("todos"));
   }

   return todos;

}

function addTodoToStorage(newTodo){
   let todos=getTodosFromStorage();
   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos));
}
function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
   firstCardBody.appendChild(alert);


   //setTimeOut

   setTimeout(function () {
    alert.remove();
    
   },1000)
}

//String değelerini ListItem olarak Uİ ekler.
function addTodoToUI(newTodo){

//listItem Olusturma
const listItem=document.createElement("li");

//Link oluşturma
const link=document.createElement("a");
link.href="#";
link.className="delete-item";
link.innerHTML="<i class = 'fa fa-remove'></i>";
listItem.className="list-group-item d-flex justify-content-between";

//Text node ekleme 
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);

//todoListe liatItem eklmek
todoList.appendChild(listItem);
todoInput.value="";

}




