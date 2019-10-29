export type GoogleSheetsRowType = {
  gsx$name: {
    $t: string;
  };
  gsx$type: {
    $t: string;
  };
  gsx$link: {
    $t: string;
  };
};

export type GoogleSheetsEntryType = Array<GoogleSheetsRowType>;

export interface RecipeType {
  name: string;
  type: string;
  link: string;
}

export type RecipesType = Array<RecipeType & { id: number }>;

export interface RecipeProps extends RecipeType {
  nameSearch: string | null;
  showType: boolean;
}

interface RecipeTypeOptionType {
  value: string;
  active: boolean;
  disabled: boolean;
}

export type RecipeTypeOptionsType = Array<RecipeTypeOptionType>;

export interface SearchFilterProps {
  recipeType: string | null;
  recipeTypeOptions: RecipeTypeOptionsType;
  handleRecipeTypeChange: Function;
  recipeNameSearch: string | null;
  handleRecipeNameSearchChange: Function;
  handleClear: Function;
}

export interface FiltersType {
  recipeType: string | null;
  recipeNameSearch: string | null;
}
