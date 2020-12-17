import axios from 'axios';
import { IRecipe } from './types';
import { mungGoogleSheetsEntry } from './utils';

export const adapter = axios.create({
  baseURL: 'https://spreadsheets.google.com/feeds/'
});

export default {
  async getRecipes(): Promise<IRecipe[]> {
    try {
      const response = await adapter.get(
        '/list/106-nwBqrxeCGMSY0ZOUAjRvlbL2b2xAJgPy67M_Btc8/od6/public/values?alt=json'
      );
      return mungGoogleSheetsEntry(response.data.feed.entry);
    } catch (err) {
      throw new Error('Error fetching recipes');
    }
  }
};
