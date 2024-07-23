import { ListokInterface } from '@typed/listok-types';
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

export const unpackFetchedListoks = (fetchedListoks: any) => {
  const unpackedListoks: ListokInterface[] = [];
  for (let listok of fetchedListoks) {
    const unpackedListok: ListokInterface = {
      id: listok._id,
      title: listok.title,
      desc: listok.desc,
      picture: listok.picture,
      days: JSON.parse(listok.days),
      createdBy: listok.createdBy,
      createdByName: listok.createdByName,
      createdOn: listok.createdOn,
    };
    unpackedListoks.push(unpackedListok);
  }
  console.log(' Unpacked Listoks: ', unpackedListoks);
  return unpackedListoks;
};
