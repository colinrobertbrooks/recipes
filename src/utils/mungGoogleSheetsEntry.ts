import { IGoogleSheetsRow, IRecipe } from '../types';

const mungGoogleSheetsEntry = (entry: IGoogleSheetsRow[]): IRecipe[] =>
  entry.map(({ gsx$name, gsx$type, gsx$link, gsx$notes }, id) => ({
    id,
    name: gsx$name.$t,
    type: gsx$type.$t,
    link: gsx$link.$t,
    notes: gsx$notes.$t || null
  }));

export default mungGoogleSheetsEntry;
