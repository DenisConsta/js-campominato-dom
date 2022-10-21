//? HTML elements
const grid = document.querySelector('.grid');
const btn = document.querySelector('.my-btn');
const output = document.querySelector('output');
//? Arrow functions
const dimRow = (n) => Math.sqrt(n);
const myRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const isWin = () => score === (list.length - BOMBS);
//? Variables
let isGenerate = false, limit, score = 0;
let list = [], bombsList = [];
const BOMBS = 16;

//? listener button GENERA
btn.addEventListener('click', play);

//? Funzione di gioco (play)
function play(){
  if(!isGenerate){
    grid.classList.remove('d-none');
    isGenerate = true;
    document.querySelector('h2').remove();
  }else{
    reset();
  }
  initGrid();
  bombsList = generateBombs(limit);
}

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

//? Funzione per il click della cella
function handlerClickCell(){
  if(!this.isClicked){
    this.classList.add('clicked');
    this.isClicked = true;
    console.log(this.idCell, this.isClicked);

    if(bombsList.includes(this.idCell))
      endGame(false);
    else
      score++;
  }

  if(isWin())
    endGame(true);
}

//? Genera un'array di indici dove sono presenti le bombe
function generateBombs(cells){
  const bombsList = [];
  let random;

  while(bombsList.length < BOMBS){
    random = myRandom(1, cells);
    if(!bombsList.includes(random))
      bombsList.push(random);
  }
  return bombsList;
}

//? Reset campi
function reset(){
  const mask = document.createElement('div');
  mask.className = "mask d-none";
  grid.replaceChildren(mask);
  output.innerText = "";
  score = 0;
  list = [];
  document.querySelector('.mask').classList.add('d-none');
}

//? Funzione di fine gioco che lancia l'output del risultato
function endGame(outcome){
  if(outcome){
    output.innerText = `HAI VINTO !`;
  }else{
    seeBombs();
    output.innerText = `
    HAI PERSO :(
    score : ${score} su ${list.length - BOMBS}
    `;
  }
  document.querySelector('.mask').classList.remove('d-none');
}

// ? Mostra tute le bombe sulla mappa
function seeBombs(){
  bombsList.forEach(el => {
    list[el-1].classList.add('bomb');
  });
}
