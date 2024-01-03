//Ana katman burası old için index.html de en alta yazılır ki diğer jslerin özelliklerini okuyabilsin.
const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody=document.querySelectorAll(".card-body")[1];
const clear=document.getElementById("clear-films");

 //UI,STORAGE classları static olduğundan newlemeye gerek yok.Direkt sınıf ismiyle çağırabilirsin.

//Tüm eventleri yükleme
eventListeners();

function eventListeners(){
   form.addEventListener("submit",addFilm);
   document.addEventListener("DOMContentLoaded",function(){
    let films=Storage.getFilmsFromStorage();
    UI.loadAllFilms(films);
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
        UI.displayMessage("Tüm alanları doldurun","danger");
    }
    else{
        //Yeni film
        const newFilm=new Film(title,director,url);
        //Arayüze film ekleme
        UI.addFilmToUI(newFilm);
        //Storage film ekleme
        Storage.addFilmToStorage(newFilm);
        UI.displayMessage("Film barıyla eklendi","success")
    }
     
      UI.clearInputs(titleElement,directorElement,urlElement);
    e.preventDefault();
}


function deleteFilm(e){
    if(e.target.id==="delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessage("Silme islemi basarili","success");
    }
}

function clearAllFilms(){
    if(confirm("Emin misiniz ?")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }
 
}
