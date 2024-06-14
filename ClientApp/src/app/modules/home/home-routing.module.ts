import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./Pages/main/main.component";
import { MainSidebarComponent } from "../sidebar/main-sidebar/main-sidebar.component";
import { SettingsSidebarComponent } from "../sidebar/settings-sidebar/settings-sidebar.component";
import { FriendsSidebarComponent } from "../sidebar/friends-sidebar/friends-sidebar.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: MainSidebarComponent
      },
      {
        path: 'settings',
        component: SettingsSidebarComponent
      },
      {
        path: 'friends',
        component: FriendsSidebarComponent
      }
    ]
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomeRoutingModule { }