//Ana katman burası old için index.html de en alta yazılır ki diğer jslerin özelliklerini okuyabilsin.
const form=document.getElementById("film-form");
const titleElement=document.querySelector("#title");
const directorElement=document.querySelector("#director");
const urlElement=document.querySelector("#url");

addEventListener();

function addEventListener(){
   form.addEventListener("submit",addFilm);
}

function addFilm(e){
    const title=titleElement.value;
    const director=directorElement.value;
    const url=urlElement.value;
    if(title===""|| director===""||url===""){
        //hata
    }
    else{
        //Yeni film
        const newFilm=new Film(title,director,url);
        //Arayüze film ekleme
        ui.addFilmToUI(newFilm);
    }

}
