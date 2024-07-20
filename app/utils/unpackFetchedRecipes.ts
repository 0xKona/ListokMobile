import { RecipeType } from '@typed/recipe-types';

export const unpackFetchedRecipes = (fetchedRecipes: any) => {
  const unpackedRecipes: RecipeType[] = [];
  for (let recipe of fetchedRecipes) {
    const unpackedRecipe: RecipeType = {
      id: recipe._id,
      title: recipe.title,
      desc: recipe.desc,
      createdBy: recipe.createdBy,
      createdByName: recipe.createdByName,
      createdOn: recipe.createdOn,
      public: recipe.public,
      picture: recipe.picture,
      ingredients: JSON.parse(recipe.ingredients),
      method: JSON.parse(recipe.method),
    };
    unpackedRecipes.push(unpackedRecipe);
  }
  console.log(' Unpacked Recipes: ', unpackedRecipes);
  return unpackedRecipes;
};
