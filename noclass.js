
let currentPokemon = 94;
let isFront = true;


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
