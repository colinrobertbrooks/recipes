import { GoogleSheetsEntryType, RecipesType } from '../types';

const mungeGoogleSheetsEntry = (entry: GoogleSheetsEntryType): RecipesType =>
  entry.map(({ gsx$name, gsx$type, gsx$link }, id) => ({
    id,
    name: gsx$name.$t,
    type: gsx$type.$t,
    link: gsx$link.$t
  }));

export default mungeGoogleSheetsEntry;
