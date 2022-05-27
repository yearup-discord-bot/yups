const { SlashCommandBuilder } = require('@discordjs/builders');

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
	async execute(interaction) {
		let track = interaction.options.getString('track');
		let now = new Date();
		let epoch = now.getTime();
		let msg = "This is the zoom link for class right now: ";

		for (const key in this.date_thresholds)
		{
			if (epoch >= this.date_thresholds[key][0] && epoch < this.date_thresholds[key][1])
			{
				if (track === "app_dev")
				{
					await interaction.reply({content: msg + this.zoom_links[this.ad_links[key][now.getDay()]], ephemeral: true});
				}
				if (track === "qa")
				{
					await interaction.reply({content: msg + this.zoom_links[this.qa_links[key][now.getDay()]], ephemeral: true});
				}
				return;
			}
		}

		console.log("failed to find class @ " + now);
		await interaction.reply({content: this.zoom_links["no"], ephemeral: true});
	},
	date_thresholds: {
		"first" : [new Date().setHours(8, 0), new Date().setHours(9, 50)],
		"second" : [new Date().setHours(9, 50), new Date().setHours(11, 30)],
		"third" : [new Date().setHours(11, 30), new Date().setHours(13, 50)],
		"fourth" : [new Date().setHours(13, 50), new Date().setHours(15, 30)]
	},
	zoom_links: {
		no:			"No class right now, chillax.",
		mmk:		"https://yearup.zoom.us/j/96949846942",
		bill:		"https://zoom.us/my/bill.newman",
		dan:		"https://zoom.us/j/94020008562?pwd=RUlUcDVzYlpPQkdDNFZ5THh5MldnQT09",
		jessicka:	"https://zoom.us/j/94673924563?pwd=ZWZKY21TWWl0Z0ZScFQ1dTAydExmQT09",
		robin: 	"https://yearup.zoom.us/j/91797938950",
		monte: 	"https://zoom.us/j/3735217863",
		aas:		"https://yearup.zoom.us/j/98981437398",
		gotosleep:	"Go back to sleep...",
		before_lunch: "Early lunch?",
		after_lunch:"Lunch 2.0?",
		snarky_1:	"Are you still home???!!!",
		snarky_2: 	"Aight, what are you still doing asking me about your zoom class?",
		snarky_3: 	"You ok?",
		snarky_4:	"Enjoy your weekend already."
	},
	qa_links: {
		"first" : [
			"no",
			"mmk",
			"bill",
			"bill",
			"bill",
			"snarky_1",
			"no"
		],
		"second" : [
			"no",
			"dan",
			"before_lunch",
			"jessicka",
			"before_lunch",
			"snarky_2",
			"no"
		],
		"third" : [
			"no",
			"after_lunch",
			"dan",
			"dan",
			"robin",
			"snarky_3",
			"no"
		],
		"fourth" : [
			"no",
			"monte",
			"monte",
			"monte",
			"aas",
			"snarky_4",
			"no"
		]
	},
	ad_links: {
		"first" : [
			"no",
			"mmk",
			"jessicka",
			"gotosleep",
			"gotosleep",
			"snarky_1",
			"no"
		],
		"second" : [
			"no",
			"before_lunch",
			"bill",
			"bill",
			"bill",
			"snarky_2",
			"no"
		],
		"third" : [
			"no",
			"monte",
			"monte",
			"monte",
			"aas",
			"snarky_3",
			"no"
		],
		"fourth" : [
			"no",
			"dan",
			"dan",
			"dan",
			"robin",
			"snarky_4",
			"no"
		]
	}
};
