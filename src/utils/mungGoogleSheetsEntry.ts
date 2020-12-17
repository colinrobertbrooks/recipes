import { IGoogleSheetsRow, IRecipe } from '../types';

const mungGoogleSheetsEntry = (entry: IGoogleSheetsRow[]): IRecipe[] =>
  entry.map(({ gsx$name, gsx$type, gsx$link }, id) => ({
    id,
    name: gsx$name.$t,
    type: gsx$type.$t,
    link: gsx$link.$t
  }));

export default mungGoogleSheetsEntry;
