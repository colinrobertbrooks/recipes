import axios from 'axios';
import { RecipesType } from './types';
import { mungeGoogleSheetsEntry } from './utils';

export const adapter = axios.create({
  baseURL: 'https://spreadsheets.google.com/feeds/'
});

export default {
  async getRecipes(): Promise<RecipesType> {
    try {
      const response = await adapter.get(
        '/list/106-nwBqrxeCGMSY0ZOUAjRvlbL2b2xAJgPy67M_Btc8/od6/public/values?alt=json'
      );
      return mungeGoogleSheetsEntry(response.data.feed.entry);
    } catch (e) {
      throw new Error('Error fetching recipes');
    }
  }
};
