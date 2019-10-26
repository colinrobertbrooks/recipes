export type GoogleSheetRow = {
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

export type GoogleSheetRowsType = Array<GoogleSheetRow>;

export type RecipeType = {
  id: number;
  name: string;
  type: string;
  link: string;
};

export type RecipesType = Array<RecipeType>;
