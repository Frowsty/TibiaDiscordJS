const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const { MessageEmbed, HTTPError } = require('discord.js');
const { api } = require('./../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('share')
		.setDescription('Replies with character information')
		.addIntegerOption(option =>
			option.setName('level')
			.setDescription('Level')
			.setRequired(true)),
	async execute(interaction) {
        let level = interaction.options.getInteger("level");
        let minLevel = Math.round(level * (2/3));
        let maxLevel = Math.round(level * 2);
        while (maxLevel * (2/3) - level > 0) {
            maxLevel -= 1;
        }
        const shareEmbed = new MessageEmbed()
            .setColor('#05995b')
            .setTitle(`Level ${level}`)
            .addFields({name: 'Range', value: `**Min:** ${minLevel} - **Max:** ${maxLevel}`, inline: true })
            .setTimestamp()

        interaction.reply({ embeds: [shareEmbed] });
    }
};