import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
  collapsed = true;
  // @ts-ignore
  private userSub: Subscription;
  isAuthenticated = false;


  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }
  onSaveData(){
    this.dataStorageService.storeRecipe();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe()
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnInit() {
   this.userSub = this.authService.user.subscribe(user=>{
     this.isAuthenticated = !!user;
   })
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}
