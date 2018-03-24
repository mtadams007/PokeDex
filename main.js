//variables that get pulled later
let colonel;
let currentPokemon = 1;
let isFront = true;

//construct a trainer
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

//construct a pokemon
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

//creates one pokemon through ajax
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

//creates the array of pokemon to make trainer
let createFriends = (arr) => {
  let i = 0;
  while (i<arr.length) {
    createPoke(arr[i]);
    i++;
  }
}

//made to create trainer after everything loads
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
  counter = Math.abs(counter);
  return counter;
}

//how to change pokemon
let changePokemon = () => {
  $('#leftScreen').html('');
  $('#rightScreen').html('');
  let p = whichPokemon(colonel);
  $('#leftScreen').prepend(`<img src='${colonel[p].frontPic}' id="pic">`);
  $('#leftScreen').append(`<h2 id='pokeName'>${colonel[p].name}</h2>`);
  displayStats(colonel[p]);
  isFront = true;
}

//creates my army
createFriends([68,94,129]);

//Turns on pokedex and creates my trainer
$('#powerButton').click(function(powerOn){
  makeTrainer();
})

//changes pokemon backwards
$('#previous').click(function(e) {
  currentPokemon--;
  changePokemon();
})

//changes pokemon forwards
$('#next').click(function(e) {
  currentPokemon++;
  changePokemon();
})

//Changes picture of pokemon from front to back
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

//command to change picture
$('#newPic').click(function(e) {
  changePic();
})

//pull abilities from pokemon
let getAbilities = (obj) => {
  let skillz = [];
  let i = 0;
  while (i<obj.abilities.length) {
    let ability = obj.abilities[i].ability.name;
    skillz.push(ability);
    i++;
  }
  return skillz;
}

//shows the stats of a pokemon
let displayStats = (obj) => {
  $('#rightScreen').html('');
  $('#rightScreen').append(`<h3> HP: ${obj.hp}</h3><h3> ATTACK: ${obj.attack}</h3><h3> DEFENSE: ${obj.defense}</h3><h3> SPECIAL ATTACK: ${obj.specialAttack}</h3><h3> SPECIAL DEFENSE: ${obj.specialDefense}</h3><h3> SPEED: ${obj.speed}</h3>`);
  $('#rightScreen').prepend(`<h1 id='#rightDescriptor'>STATS</h1>`)
}

//shows abilities upon clicking button
$('#abilities').click(function(e) {
  $('#rightScreen').html('');
  let p = whichPokemon(colonel);
  let skillz = getAbilities(colonel[p]);
  console.log(skillz);
  if (skillz.length === 3) {
    $('#rightScreen').html(`<h3>${skillz[2]}</h3><h3>${skillz[1]}</h3><h3>${skillz[0]}</h3>`);
  } else if (skillz.length === 2) {
    $('#rightScreen').html(`<h3>${skillz[1]}</h3><h3>${skillz[0]}</h3>`);
  } else {
    $('#rightScreen').html(`<h3>${skillz[0]}</h3>`);
  }
  $('#rightScreen').prepend(`<h1 id='#rightDescriptor'>ABILITIES</h1>`)
})

$('#stats').click(function(e) {
  let p = whichPokemon(colonel);
  displayStats(colonel[p]);
})




















//
