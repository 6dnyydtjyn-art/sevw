import { SlashCommandBuilder } from 'discord.js';
import { logger } from '../../utils/logger.js';

export default {
  data: new SlashCommandBuilder()
    .setName('vouch')
    .setDescription('Leave a vouch for a seller')
    .addUserOption((option) =>
      option
        .setName('seller')
        .setDescription('The seller you are vouching for')
        .setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName('rating')
        .setDescription('Give the seller a rating from 1-5')
        .setRequired(true)
        .addChoices(
          { name: '⭐ 1', value: 1 },
          { name: '⭐⭐ 2', value: 2 },
          { name: '⭐⭐⭐ 3', value: 3 },
          { name: '⭐⭐⭐⭐ 4', value: 4 },
          { name: '⭐⭐⭐⭐⭐ 5', value: 5 },
        ),
    ),

  async execute(interaction) {
    const seller = interaction.options.getUser('seller');
    const rating = interaction.options.getInteger('rating');

    try {
      await interaction.reply({
        content: `⭐ **Vouch submitted!**\n\nSeller: ${seller}\nRating: ${rating}/5`,
      });
    } catch (error) {
      logger.error('Failed to send vouch reply:', error);
    }
  },
};
