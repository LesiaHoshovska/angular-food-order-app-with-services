import {Recipe} from "./recipe.model";
import { Injectable} from "@angular/core";
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  // private recipes: Recipe[]=[
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super tasty Schnitzel - just awesome!',
  //     'https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-5.jpg',
  //   [
  //     new Ingredient('Meet', 1),
  //     new Ingredient('French fries', 20)
  //   ]),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'What else you need to say!?',
  //     'https://assets.bonappetit.com/photos/5b919cb83d923e31d08fed17/1:1/w_2560%2Cc_limit/basically-burger-1.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 2)
  //     ])
  // ];

  constructor(private slService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
