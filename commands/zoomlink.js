const { SlashCommandBuilder } = require('@discordjs/builders');

async function execute(interaction) {
	let track = interaction.options.getString('track');
	// let now = new Date('June 10, 2022 08:29:00');
	let now = new Date();
	let epoch = now.getTime();
	let nowMsg = 'This is the zoom link for class right now: ';
	let nextMsg = 'This is the link for the next class:'

	const date_thresholds = [
		[new Date().setHours(8, 0), 	new Date().setHours(9, 50)],		// first period
		[new Date().setHours(9, 50), 	new Date().setHours(11, 30)],		// second period
		[new Date().setHours(11, 30), 	new Date().setHours(13, 50)],		// third period
		[new Date().setHours(13, 50), 	new Date().setHours(15, 30)]		// fourth period
	]

	for ( i = 0; i < date_thresholds.length; i++ )
	{
		if (epoch >= date_thresholds[i][0] && epoch < date_thresholds[i][1])
		{
			if (track === 'app_dev')
			{
				let msg = i >= this.ad_links.length - 1 ? nowMsg + ad_links[i][now.getDay()] : nowMsg + ad_links[i][now.getDay()] + '\n' + nextMsg + ad_links[i+1][now.getDay()];
				await interaction.reply({content: msg, ephemeral: true});
			}
			if (track === 'qa')
			{
				let msg = i >= this.qa_links.length - 1 ? nowMsg + qa_links[i][now.getDay()] : nowMsg + qa_links[i][now.getDay()] + '\n' + nextMsg + qa_links[i+1][now.getDay()];
				await interaction.reply({content: msg, ephemeral: true});
			}
			return;
		}
	}

	console.log('failed to find class @ ' + now);
	await interaction.reply({content: 'No class.', ephemeral: true});
}



const zoom_links = {
	mmk:		'https://yearup.zoom.us/j/96949846942',
	IT115:		'https://zoom.us/my/bill.newman',
	BTM119:		'https://zoom.us/j/94020008562?pwd=RUlUcDVzYlpPQkdDNFZ5THh5MldnQT09',
	BTM112:		'https://zoom.us/j/94673924563?pwd=ZWZKY21TWWl0Z0ZScFQ1dTAydExmQT09',
	BTM100: 	'https://yearup.zoom.us/j/91797938950',
	IT116: 		'https://zoom.us/j/3735217863',
	aas:		'https://yearup.zoom.us/j/98981437398',
}

const qa_links = [
	[ undefined, zoom_links.mmk, zoom_links.IT115, zoom_links.IT115, zoom_links.IT115, undefined, undefined ],			// first period
	[ undefined, zoom_links.BTM119, undefined, zoom_links.BTM112, undefined, undefined, undefined ],					// second period
	[ undefined, undefined, zoom_links.BTM119, zoom_links.BTM119, zoom_links.BTM100, undefined, undefined ],			// third period
	[ undefined, zoom_links.IT116, zoom_links.IT116, zoom_links.IT116, zoom_links.aas, undefined, undefined ]			// fourth period
]

const ad_links = [
	[ undefined, zoom_links.mmk, zoom_links.BTM112, undefined, undefined, undefined, undefined ],						// first period
	[ undefined, undefined, zoom_links.IT115, zoom_links.IT115, zoom_links.IT115, undefined, undefined ],				// second period
	[ undefined, zoom_links.IT116, zoom_links.IT116, zoom_links.IT116, zoom_links.aas, undefined, undefined ],			// third period
	[ undefined, zoom_links.BTM119, zoom_links.BTM119, zoom_links.BTM119, zoom_links.BTM100, undefined, undefined ]		// fourth period
]


module.exports = {
	data: new SlashCommandBuilder()
	.setName('zoomlink')
	.setDescription('Replies with the zoom link for class.')
	.addStringOption(option =>
		option.setName('track')
		.setDescription('Select your track')
		.setRequired(true)
		.addChoices({name: 'Application Dev', value: 'app_dev'})
		.addChoices({name: 'Quality Assurance', value: 'qa'})),
	execute,
	zoom_links,
	qa_links,
	ad_links
};
