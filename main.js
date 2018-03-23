
let currentPokemon = 94;


let changePokemon = () => {
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${currentPokemon}/`,
    type: 'GET',
    success: function(data) {
      console.log('i choose you')
      // let pokeName = data.name
      $('#leftScreen').prepend(`<img src='${data.sprites.front_default}'>`);
      $('#pokeName').append(`${data.name}`);
      $('#rightScreen').append(`<h3> HP: ${data.stats[5].base_stat}<h3><h3> ATTACK: ${data.stats[4].base_stat}<h3><h3> DEFENSE: ${data.stats[3].base_stat}<h3><h3> SPECIAL ATTACK: ${data.stats[2].base_stat}<h3><h3> SPECIAL DEFENSE: ${data.stats[1].base_stat}<h3><h3> SPEED: ${data.stats[0].base_stat}<h3>`);
      $('#rightDescriptor').append('STATS');
    }
  })
}
