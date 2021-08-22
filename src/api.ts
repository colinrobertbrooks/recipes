import axios from 'axios';
import { IRecipe } from './types';
import { deserializeRecipes } from './utils';

export const adapter = axios.create({
  baseURL: 'https://sheets.googleapis.com/v4/spreadsheets'
});

export const defaultSpreadsheetId =
  '106-nwBqrxeCGMSY0ZOUAjRvlbL2b2xAJgPy67M_Btc8';
export const defaultRange = 'Recipes';
export const defaultKey = 'AIzaSyAqCMNvKSDiOb0yIAjLF2Z1T5gSsAetaVA';

export default {
  async getRecipes(
    spreadsheetId: string | null | undefined = defaultSpreadsheetId,
    key: string | null | undefined = defaultKey
  ): Promise<IRecipe[]> {
    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
    try {
      const response = await adapter.get(
        `${spreadsheetId}/values/${defaultRange}?key=${key}`
      );
      return deserializeRecipes(response.data.values);
    } catch (err) {
      throw new Error('Error fetching recipes');
    }
  }
};
