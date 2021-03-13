import axios from 'axios';
import { IRecipe } from './types';
import { mungGoogleSheetsEntry } from './utils';

export const adapter = axios.create({
  baseURL: 'https://spreadsheets.google.com/feeds/'
});

export default {
  async getRecipes(
    spreadsheet:
      | string
      | null
      | undefined = '106-nwBqrxeCGMSY0ZOUAjRvlbL2b2xAJgPy67M_Btc8',
    worksheet = 1 // http://deswal.org/2016/01/02/you-dont-need-od6-when-working-with-google-sheets-json/
  ): Promise<IRecipe[]> {
    try {
      const response = await adapter.get(
        // https://developers.google.com/gdata/samples/spreadsheet_sample
        `/list/${spreadsheet}/${worksheet}/public/values?alt=json`
      );
      return mungGoogleSheetsEntry(response.data.feed.entry);
    } catch (err) {
      throw new Error('Error fetching recipes');
    }
  }
};
