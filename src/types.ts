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
  recipeTypeQuery: string | null | undefined;
  recipeNameQuery: string | null | undefined;
}
