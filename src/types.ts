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

export type RecipeType = {
  id: number;
  name: string;
  type: string;
  link: string;
};

export type RecipesType = Array<RecipeType>;
