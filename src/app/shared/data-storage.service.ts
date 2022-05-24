import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../components/recipes/recipe.service";
import {Recipe} from "../components/recipes/recipe.model";
import {map, tap, take, exhaustMap} from "rxjs";
import {AuthService} from "../components/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService{
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipe(){
    const recipe = this.recipeService.getRecipes();
    this.http.put('https://angular-recipe-book-be989-default-rtdb.firebaseio.com/recipes.json', recipe)
      .subscribe(response=>{
        console.log(response)
      })
  }

  fetchRecipes(){
        return this.http.get<Recipe[]>('https://angular-recipe-book-be989-default-rtdb.firebaseio.com/recipes.json',)
          .pipe(
            map(recipes=>{
              return recipes.map(recipe=>{
                return {...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []}
              })
            }),
            tap(recipes=>{
              this.recipeService.setRecipes(recipes)
            })
     )
  }
}
