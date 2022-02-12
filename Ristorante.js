const Ristorante={}

Ristorante.numeroPersoneW=document.getElementById("numero-persone-w");
Ristorante.numeroPersone=document.getElementById("numero-persone");
Ristorante.tavoliW=document.getElementById('tavoli-w');
Ristorante.tavoloSelezionato = document.getElementById('tavolo-selezionato') ;
Ristorante.messageStatus = document.getElementById('message-status');


(async function costruisciSala() {
    Ristorante.sala = await fetch("sala.json");
    Ristorante.sala = await Ristorante.sala.json();
    Ristorante.tavoli= Ristorante.sala.tavoli;
disponiTavoli(Ristorante.tavoli);
console.log(Ristorante.sala.tavoli);
})();

function disponiTavoli (tavoli) {
    tavoli.forEach(function (tavolo, i) {
        let classiTavolo = 'tavolo', tavoloDOM = document.createElement('div');
        tavoloDOM.appendChild(document.createTextNode(i + 1));
        classiTavolo += tavolo.occupato ? 'occupato' : 'libero';
        classiTavolo += tavolo.posti == 4 ? 'x4' : 'x2';
        tavoloDOM.setAttribute('class', classiTavolo);
        Ristorante.tavoliW.appendChild(tavoloDOM);
    });
}


Ristorante.numeroPersoneW.addEventListener('click', (e) =>{
    e.preventDefault();
    let numeroPersone = +Ristorante.numeroPersone.textContent;
     if(e.target.id === 'add'){
         Ristorante.numeroPersone.textContent =numeroPersone + 1;
     }else if (e.target.id === 'sub' && numeroPersone > 1){
         Ristorante.numeroPersone.textContent = numeroPersone - 1;

     }
});
 Ristorante.tavoliW.addEventListener('click', (e) => {
     let selezionato = +e.target.textContent;
     if (Ristorante.tavoli[selezionato-1].occupato) {
         Ristorante.messageStatus.textContent = 'Il tavolo ${selezionato} è occupato';
     } else {
         Ristorante.tavoloSelezionato.textContent = selezionato;
     }
 });
 document.forms[0].addEventListener('submit',(e) =>{
     e.preventDefault();
     if(Ristorante.tavoloSelezionato.textContent == '-'){
         Ristorante.messageStatus.textContent = 'E necessario inserire un tavolo';
         return;}
     sendRistorante();
 });

 function sendRistorante(){
   let RistoranteForm = new FormData();
   RistoranteForm.append('numero-perone', +Ristorante.numeroPersone.textContent);
   RistoranteForm.append('tavolo',+Ristorante.tavoloSelezionato.textContent);
   RistoranteForm.append('nome', document.forms[0].nome.value);
   RistoranteForm.append('nome', document.forms[0].email.value);
     console.log('invio la prenotazione');
     fetch('RistoranteScript', {
         body: RistoranteForm,
         method: 'post'
     });
     Ristorante.messageStatus.textContent= 'La prenotazione è andata a buon fine';
     document.forms[0].reset();
 }