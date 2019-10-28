import { RecipesType, RecipeTypeOptionsType } from '../types';

const getRecipeTypeOptions = ({
  recipes,
  currentValue
}: {
  recipes: RecipesType;
  currentValue: string | null;
}): RecipeTypeOptionsType => {
  return recipes
    .map(({ type }) => type)
    .reduce((options: string[], type) => {
      if (!options.includes(type)) {
        options.push(type);
      }
      return options;
    }, [])
    .sort((a, b) => a.localeCompare(b))
    .map(value => ({
      value,
      active: value === currentValue,
      disabled: false
    }));
};

export default getRecipeTypeOptions;
