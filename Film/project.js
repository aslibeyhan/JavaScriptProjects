//Ana katman burası old için index.html de en alta yazılır ki diğer jslerin özelliklerini okuyabilsin.
const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody=document.querySelectorAll(".card-body")[1];
const clear=document.getElementById("clear-films");

//UI objesini başlatma
const ui=new UI();

//Storage objesi üret
const storage=new Storage();

//Tüm eventleri yükleme
eventListeners();

function eventListeners(){
   form.addEventListener("submit",addFilm);
   document.addEventListener("DOMContentLoaded",function(){
    let films=storage.getFilmsFromStorage();
    ui.loadAllFilms(films);
   });

   cardBody.addEventListener("click",deleteFilm);
   clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title=titleElement.value;
    const director=directorElement.value;
    const url=urlElement.value;
    if(title===""|| director===""||url===""){
        //hata
        ui.displayMessage("Tüm alanları doldurun","danger");
    }
    else{
        //Yeni film
        const newFilm=new Film(title,director,url);
        //Arayüze film ekleme
        ui.addFilmToUI(newFilm);
        //Storage film ekleme
        storage.addFilmToStorage(newFilm);
        ui.displayMessage("Film barıyla eklendi","success")
    }
     
      ui.clearInputs(titleElement,directorElement,urlElement);
    e.preventDefault();
}


function deleteFilm(e){
    if(e.target.id==="delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessage("Silme islemi basarili","success");
    }
}

function clearAllFilms(){
    if(confirm("Emin misiniz ?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
 
}
