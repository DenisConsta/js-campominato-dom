const grid = document.querySelector('.grid');
const btn = document.querySelector('.btn');
const dimRow = (n) => Math.sqrt(n);
let isGenerate = false, limit;
let list = [];
//? listener button GENERA
btn.addEventListener('click', function(){

  if(!isGenerate){
    grid.classList.remove('d-none');
    isGenerate = true;
  }else{
    grid.replaceChildren();
  }

  initGrid();

});

// ? Inizializza la griglia
function initGrid(){
  limit = parseInt(document.querySelector('select').value);
  for(let i=0; i<limit; i++){
    list.push(createCell(i));
  }
}

// ? Crea le celle nella griglia 
function createCell(index){
  const cell = document.createElement('div');
  cell.style.width = `calc(${100}% / ${dimRow(limit)})`;
  cell.classList.add('cell');
  cell.innerHTML = index + 1;
  cell.idCell = index + 1;
  grid.appendChild(cell);
  cell.isClicked = false;

  //? Listener cella 
  cell.addEventListener('click', handlerClickCell);

  return cell;
}

function handlerClickCell(){
  if(!this.isClicked){
    this.classList.add('clicked');
    this.isClicked = true;
    console.log(this.idCell,this.isClicked);
  }
}