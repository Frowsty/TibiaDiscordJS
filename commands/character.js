const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const { MessageEmbed, HTTPError } = require('discord.js');
const { api } = require('./../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('character')
		.setDescription('Replies with character information')
		.addStringOption(option =>
			option.setName('name')
			.setDescription('Character name')
			.setRequired(true)),
	async execute(interaction) {
		let name = interaction.options.getString("name").replace(" ", "%20");
		let url = `${api}/characters/character/${name}`;
		let settings = { method: "Get" };

		fetch(url, settings)
			.then(res => res.json())
			.then((json) => {
				let charName = json.characters.character.name;
				if (charName.lenght > 0) {
					let with_guild = `**Level:** ${json.characters.character.level}
					**Vocation:** ${json.characters.character.vocation}
					**World:** ${json.characters.character.world}
					**Residence:** ${json.characters.character.residence}
					**Title:** ${json.characters.character.title}
					**Guild:** ${json.characters.character.guild.rank} of the [${json.characters.character.guild.name}](https://www.tibia.com/community/?subtopic=guilds&page=view&GuildName=${json.characters.character.guild.name.replace(" ", "%20")})
					`;

					let without_guild = `**Level:** ${json.characters.character.level}
					**Vocation:** ${json.characters.character.vocation}
					**World:** ${json.characters.character.world}
					**Residence:** ${json.characters.character.residence}
					**Title:** ${json.characters.character.title}
					`;

					let has_guild = json.characters.character.guild.name.length > 0;
					const characterEmbed = new MessageEmbed()
						.setColor('#7413cf')
						.setTitle(json.characters.character.name)
						.setURL(`https://www.tibia.com/community/?name=${name}`)
						.addFields(
							{ name: `${json.characters.character.name} :${json.characters.character.sex}_sign:`, value: `${has_guild ? with_guild : without_guild}`, inline: true },
							{ name: 'Account Information', value: `**Status:** ${json.characters.character.account_status} `, inline: true }
						)
						.setTimestamp()
						.setFooter('Powered by TibiaData v3')
						
					interaction.reply({ embeds: [characterEmbed] });
				} else {
					interaction.reply("Character not found");
				}
			});
	},
};