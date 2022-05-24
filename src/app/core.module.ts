import {NgModule} from "@angular/core";
import {ShoppingListService} from "./components/shopping-list/shopping-list.service";
import {RecipeService} from "./components/recipes/recipe.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./components/auth/auth-interceptor.service";

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],
})
export class CoreModule{

}
