import { TSpreadsheetDatum, IRecipe } from '../types';

const deserializeRecipes = (values: string[][]): IRecipe[] => {
  const [headRow, ...bodyRows] = values;
  const data: TSpreadsheetDatum[] = [];
  bodyRows.forEach(row => {
    const datum: TSpreadsheetDatum = {};
    row.forEach((val, valIdx) => {
      datum[headRow[valIdx]] = val;
    });
    data.push(datum);
  });

  return data.map(({ name, type, link, notes }, id) => ({
    id,
    name,
    type,
    link,
    notes: notes || null
  }));
};

export default deserializeRecipes;
