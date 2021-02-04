export interface IGoogleSheetsRow {
  gsx$name: {
    $t: string;
  };
  gsx$type: {
    $t: string;
  };
  gsx$link: {
    $t: string;
  };
}

export interface IRecipe {
  id: number;
  name: string;
  type: string;
  link: string;
}

export interface IRecipeTypeOption {
  value: string;
  active: boolean;
  disabled: boolean;
}

export interface IFilters {
  recipeType: string | null;
  recipeNameSearch: string | null;
}
