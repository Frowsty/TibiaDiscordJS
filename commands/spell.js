const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const { MessageEmbed, HTTPError } = require('discord.js');
const { api } = require('./../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spell')
		.setDescription('Replies with spell information')
		.addStringOption(option =>
			option.setName('name')
			.setDescription('Spell name')
			.setRequired(true)),
	async execute(interaction) {
		let name = interaction.options.getString("name").replace(" ", "%20");
		let url = `${api}/spells/spell/${name}`;
		let settings = { method: "Get" };

		fetch(url, settings)
			.then(res => res.json())
			.then((json) => {
				let spellName = json.spells.spell.name;
				if (spellName.length > 0) {
					const characterEmbed = new MessageEmbed()
						.setColor('#7413cf')
						.setTitle(json.spells.spell.name)
						.setThumbnail(String(json.spells.spell.image_url))
						.addFields(
							{ name: `Name: ${json.spells.spell.name}`, value: `**Formula:** ${json.spells.spell.spell_information.formula}
							**Mana:** ${json.spells.spell.spell_information.mana}
							**Cost:** ${json.spells.spell.spell_information.price}
							**Premium:** ${json.spells.spell.spell_information.premium_only ? "Yes" : "No"}`}
						)
						.setTimestamp()
						.setFooter('Powered by TibiaData v3')
						
					interaction.reply({ embeds: [characterEmbed] });
				} else {
					interaction.reply("Spell not found");
				}
			});
	},
};