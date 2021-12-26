const { SlashCommandBuilder, Embed } = require('@discordjs/builders');
const { MessageEmbed, HTTPError } = require('discord.js');
const { api } = require('./../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Replies with Vocation information')
		.addIntegerOption(option =>
			option.setName('vocation')
			.setDescription('Vocation')
			.setRequired(true)
            .addChoice("Master Sorcerer", 1)
            .addChoice("Elder Druid", 1)
            .addChoice("Royal Paladin", 2)
            .addChoice("Elite Knight", 3))
        .addIntegerOption(option =>
            option.setName('level')
            .setDescription('Level')
            .setRequired(true)
            ),
	async execute(interaction) {
        let voc = interaction.options.getInteger("vocation");
        let level = interaction.options.getInteger("level");

        let speed = 0;
        let cap = 0;
        let hp = 0;
        let mana = 0;
        switch(voc) {
            case 1:
                voc = "Master Sorcerer / Elder Druid";
                speed = 117 + level - 8;
                cap = 470 + (10 * (level - 8));
                hp = 185 + (5 * (level - 8));
                mana = 90 + (30 * (level - 8));
                break;
            case 2:
                voc = "Royal Paladin";
                speed = 117 + level - 8;
                cap = 470 + (20 * (level - 8));
                hp = 185 + (10 * (level - 8));
                mana = 90 + (15 * (level - 8));
                break;
            case 3:
                voc = "Elite Knight";
                speed = 117 + level - 8;
                cap = 470 + (25 * (level - 8));
                hp = 185 + (15 * (level - 8));
                mana = 90 + (5 * (level - 8));
                break;
        }
        const statsEmbed = new MessageEmbed()
            .setColor('#158399')
            .setTitle(`${voc}`)
            .addFields({name: `Level ${level} stats`, value: `**Health:** ${hp}
            **Mana:** ${mana}
            **Capacity:** ${cap}
            **Speed:** ${speed}`, inline: true })
            .setTimestamp()

        interaction.reply({ embeds: [statsEmbed] });
    }
};