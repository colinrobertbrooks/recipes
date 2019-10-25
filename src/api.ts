import axios from 'axios';

export const adapter = axios.create({
  baseURL: 'https://spreadsheets.google.com/feeds/'
});

export default {
  async getRecipes(): Promise<[]> {
    try {
      const response = await adapter.get(
        '/list/106-nwBqrxeCGMSY0ZOUAjRvlbL2b2xAJgPy67M_Btc8/od6/public/values?alt=json'
      );
      return response.data;
    } catch (e) {
      throw new Error('Error fetching recipes');
    }
  }
};
