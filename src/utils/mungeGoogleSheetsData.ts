import { GoogleSheetRowsType, RecipesType } from '../types';

const mungeGoogleSheetsData = (data: GoogleSheetRowsType): RecipesType =>
  data.map(({ gsx$name, gsx$type, gsx$link }, id) => ({
    id,
    name: gsx$name.$t,
    type: gsx$type.$t,
    link: gsx$link.$t
  }));

export default mungeGoogleSheetsData;
