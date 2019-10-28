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

type RecipeType = {
  id: number;
  name: string;
  type: string;
  link: string;
};

export type RecipesType = Array<RecipeType>;

export interface RecipeProps {
  name: string;
  type: string;
  link: string;
}
