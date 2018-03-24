let army = [];

class Trainer {
  constructor(arr) {
    console.log(this);
    let pokeCounter = 0;
    while (pokeCounter<arr.length) {
      this[pokeCounter+1] = arr[pokeCounter];
      pokeCounter++;
    }
  }
  all() {
    return army;
  }
  get(name){
    let i=0;
    while(i<army.length) {
      if (name === army[i].name){
        return army[i];
      } else{
        i++;
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

createFriends([68,94,129]);
  //console.log(pokeArray)


// let gengar = new Pokemon (createPoke(94))
      // return [data.name, data.sprites.front_default, data.sprites.back_default, data.stats[5].base_stat, data.stats[4].base_stat, data.stats[3].base_stat, data.name, data.stats[2].base_stat, data.stats[1].base_stat, data.stats[0].base_stat, data.abilities, data.types];
      //
$('#previous').click(function(e) {
  if (currentPokemon === 94) {
    currentPokemon = 68;
  } else if (currentPokemon === 129) {
    currentPokemon = 94;
  } else {
    currentPokemon = 129;
  }
  changePokemon();
})

$('#next').click(function(e) {
  if (currentPokemon === 94) {
    currentPokemon = 129;
  } else if (currentPokemon === 129) {
    currentPokemon = 68;
  } else {
    currentPokemon = 94;
  }
  changePokemon();
})

let changePic = () => {
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${currentPokemon}/`,
    type: 'GET',
    success: function(data) {
      $('#leftScreen').html('');
      $('#leftScreen').append(`<h2 id='pokeName'>${data.name}</h2>`);
      if (isFront) {
        $('#leftScreen').prepend(`<img src='${data.sprites.back_default}'>`);
      } else {
        $('#leftScreen').prepend(`<img src='${data.sprites.front_default}'>`)
      }
      isFront = !isFront;
    }
  })
}

let changePokemon = () => {
  $('#leftScreen').html('');
  $('#rightScreen').html('');
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${currentPokemon}/`,
    type: 'GET',
    success: function(data) {
      $('#leftScreen').prepend(`<img src='${data.sprites.front_default}' id="pic">`);
      $('#leftScreen').append(`<h2 id='pokeName'>${data.name}</h2>`);
      $('#rightScreen').append(`<h3> HP: ${data.stats[5].base_stat}<h3><h3> ATTACK: ${data.stats[4].base_stat}<h3><h3> DEFENSE: ${data.stats[3].base_stat}<h3><h3> SPECIAL ATTACK: ${data.stats[2].base_stat}<h3><h3> SPECIAL DEFENSE: ${data.stats[1].base_stat}<h3><h3> SPEED: ${data.stats[0].base_stat}<h3>`);
      $('#rightScreen').prepend(`<h2 id='#rightDescriptor'>STATS</h2>`);
      isFront = true;
    }
  })
}

$('#newPic').click(function(e) {

})
