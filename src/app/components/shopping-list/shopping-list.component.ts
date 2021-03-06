import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";
import {LoggingService} from "../../logging.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients: Ingredient[] = [];
// @ts-ignore
  private igChangeSub: Subscription

  constructor(private slService: ShoppingListService,
              private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients=this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChange.subscribe(
      (ingredients: Ingredient[])=>{
        this.ingredients = ingredients;
      }
    )
this.loggingService.printLog('Hello from ShoppingList ')
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index)
  }

  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }

}
