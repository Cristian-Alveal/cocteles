$("document").ready( function (){

let cartas = $("#cartas")
let modal ;
datos();
let card;



function datos(){
fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
.then(response => response.json())
.then(datos => revisarDatos(datos))
  }  


function revisarDatos(datos){
let html ="";
for(let dato of datos.drinks){
    html +=  `
    <div class="card  col-6 m-4" style="width: 20rem;     margin: 3.5rem!important;">
    <input type="hidden" value="${dato.idDrink}">
     <img src="${dato.strDrinkThumb}" class="card-img-top" style="width: 50%;" alt="...">
     <div class="card-body">
       <h5 class="card-title">${dato.strDrink}</h5>
       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
       
     </div>
   </div>
   `
}

cartas.html(html)

card = $(".card").click( function (){
  console.log($(this)[0].children[0].value)
  let id = $(this)[0].children[0].value
  fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+id)
.then(response => response.json())
.then(datos => agregarModal(datos.drinks))
})
}



function agregarModal(data){
  console.log(data)
  let instrucciones =""
   if(data[0].strInstructionsES =! true){
     instrucciones = data[0].strInstructionsES
   }else{
      instrucciones = data[0].strInstructions
   }
  let html ="";
  html +=  `
  <div class="modal-header">
  <h5 class="modal-title" id="staticBackdropLabel">${data[0].strDrink}</h5>
  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
      <div id="chartContainer" style="height: 450px; width: 100%;">
      <div class="row">
      <img src="${data[0].strDrinkThumb}" class="card-img-top" style="width: 50%;" alt="...">
        <div id="lista" class="col">
            <h4 class=" ">Ingedientes</h4>
            <ol class="">
              <li>${data[0].strIngredient1}</li>
              <li>${data[0].strIngredient2}</li>
              <li>${data[0].strIngredient3}</li>
              <li>${data[0].strIngredient4}</li>
            </ol>
        </div>
      </div>
      <br>
      <hr>
      <p>${instrucciones}</p>
      </div>
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>        
  </div>
        `
modal = $("#modal")
      modal.html(html)

      $("#staticBackdrop").modal("show"); 
}

















})
