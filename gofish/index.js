const deck_api = require( './deck-api.js' );

let players = [];
let winner = undefined;


async function game( n, ...usernames )
{
	console.log('GO FISH 🂠');

	// TODO : validate the number of players and if they are valid usernames...
	
	// for n number of players...
	for ( i = 0; i < n; i++ )
	{
		// create a new key with the player's username in 'players' and init
		players.push(
			{
				name: `${usernames[i]}`,
				cards: [],
				pairs: []
			}
		);
	}

	// console.log(players);


	const deck = await deck_api.getNewDeck();
	console.log( deck );
	const cards = await deck_api.drawCard( 5 * players.length, deck.deck_id );
	console.log( cards );

	console.log(players[0].cards.length);
	console.log(cards.cards.length);

	let j = players.length - 1;
	while ( cards.cards.length > 0 )
	{
		if ( j < 0 )
			j = players.length - 1;

		players[j].cards.push( cards.cards.pop() );
		j--;
	}


	console.log(players[0].cards.length);
	console.log(cards.cards.length);

	// set the turn to the last player (left of the dealer)
	let turn = players.length - 1;

	// main game loop
	while ( winner === undefined )
	{
		// reset turn if out of bounds
		if ( turn < 0 )
			turn = players.length - 1;

		console.log(`It's ${players[turn].name}'s turn!`);

		// allow player to call someone out and request a card
		// syntax: !@<user> <card>
		// ex. !@player1 K (player1 do you have a King)

		// * send main view:
		//
		// @player1:
		// 🂠 🂠 🂠 🂠 🂠 
		// @player2:
		// 🂠 🂠 🂠 🂠 🂠 
		//
		// * send the player's hands:
		//
		// Your hand: 8♥, 3♣, K♠, Q♦  -- it's an ephemeral message, only for the player to see (!hand)

		// go to the next person in line
		turn--;
	}
}

game( 5, 'bob', 'mary', 'robert', 'perry', 'jonathan' );
