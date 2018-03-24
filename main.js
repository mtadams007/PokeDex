let colonel;
let currentPokemon = 1;
let isFront = true;

class Trainer {
  constructor(arr) {
    console.log(this);
    let pokeCounter = 0;
    while (pokeCounter<arr.length) {
      this[pokeCounter] = arr[pokeCounter];
      pokeCounter++;
    }
  }
  all() {
    let soldiers = [];
    let x;
    for (x in this) {
      soldiers.push(this[x]);
    }
    return soldiers;
  }
  get(name){
    let x;
    for (x in this) {
      if (name === this[x].name){
        return this[x];
      }
    }
  }
}

class Pokemon {
  constructor(arr){
    this.name = arr[0];
    this.number = arr[1];
    this.frontPic = arr[2];
    this.backPic = arr[3];
    this.hp = arr[4];
    this.attack = arr[5];
    this.defense = arr[6];
    this.specialAttack = arr[7];
    this.specialDefense = arr[8];
    this.speed = arr[9];
    this.abilities = arr[10];
    this.type = arr[11];
  }
}

let createPoke = (num) => {
  army = [];
  return $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${num}`,
      type: 'GET',
      success: function(data) {
        pokeArray = [data.name, data.id, data.sprites.front_default, data.sprites.back_default, data.stats[5].base_stat, data.stats[4].base_stat, data.stats[3].base_stat,  data.stats[2].base_stat, data.stats[1].base_stat, data.stats[0].base_stat, data.abilities, data.types];
        console.log('heya')
        friend = new Pokemon(pokeArray);
        army.push(friend);
      }
  })
}

let createFriends = (arr) => {
  let i = 0;
  while (i<arr.length) {
    createPoke(arr[i]);
    i++;
  }
}

let makeTrainer = () => {
  colonel = new Trainer(army);
  return colonel;
}

//Lets me know how many pokemon I have
let count = (obj) => {
  return Object.keys(obj).length;
}

// uses modulus to cycle through pokemon
let whichPokemon = (obj) => {
  let mod = count(obj);
  let counter = currentPokemon%mod;
  console.log(mod);
  counter = Math.abs(counter);
  return counter;
}


let changePokemon = () => {
  $('#leftScreen').html('');
  $('#rightScreen').html('');
  let p = whichPokemon(colonel);
  $('#leftScreen').prepend(`<img src='${colonel[p].frontPic}' id="pic">`);
  $('#leftScreen').append(`<h2 id='pokeName'>${colonel[p].name}</h2>`);
  $('#rightScreen').append(`<h3> HP: ${colonel[p].hp}<h3><h3> ATTACK: ${colonel[p].attack}<h3><h3> DEFENSE: ${colonel[p].defense}<h3><h3> SPECIAL ATTACK: ${colonel[p].specialAttack}<h3><h3> SPECIAL DEFENSE: ${colonel[p].specialDefense}<h3><h3> SPEED: ${colonel[p].speed}<h3>`);
  $('#rightScreen').prepend(`<h2 id='#rightDescriptor'>STATS</h2>`);
  isFront = true;
}

createFriends([68,94,129]);

//Turns on pokedex and creates my trainer
$('#powerButton').click(function(powerOn){
  makeTrainer();
})

$('#previous').click(function(e) {
  currentPokemon--;
  changePokemon();
})

$('#next').click(function(e) {
  currentPokemon++;
  changePokemon();
})

let changePic = () => {
  $('#leftScreen').html('');
  let p = whichPokemon(colonel);
  $('#leftScreen').append(`<h2 id='pokeName'>${colonel[p].name}</h2>`);
  if (isFront) {
    $('#leftScreen').prepend(`<img src='${colonel[p].backPic}'>`);
  } else {
    $('#leftScreen').prepend(`<img src='${colonel[p].frontPic}'>`)
  }
  isFront = !isFront;
}



$('#newPic').click(function(e) {
  changePic();
})
