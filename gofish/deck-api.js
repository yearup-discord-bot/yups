const httpsRequest = ( url ) =>
{
	const https = require('node:https');
	return new Promise(( resolve, reject ) => {
		const req = https.get(url, res => {
			let data = '';
			res.on('data', chunk => {
				data += chunk;
			});
			res.on('end', () => {
				resolve(JSON.parse(data));
			});
		});

		req.on('error', e => {
			reject(e);
		});
	});
};

const getNewDeck = () => httpsRequest('https://www.deckofcardsapi.com/api/deck/new/shuffle/');

const drawCard = ( n, deckID ) => httpsRequest(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=${n}`);

const shuffleCards = ( remaining, deckID ) => httpsRequest(`https://www.deckofcardsapi.com/api/deck/${deckID}/shuffle/?remaining=${remaining}`);

module.exports = {
	httpsRequest,
	getNewDeck,
	drawCard,
	shuffleCards
}
