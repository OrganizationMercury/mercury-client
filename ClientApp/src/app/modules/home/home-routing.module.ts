import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./Pages/main/main.component";
import { MainSidebarComponent } from "./Pages/main-sidebar/main-sidebar.component";
import { AccountInfoSidebarComponent } from "./Pages/account/account-info-sidebar/account-info-sidebar.component";
import { FriendsSidebarComponent } from "./Pages/friends-sidebar/friends-sidebar.component";
import { UpdateAccountComponent } from "./Pages/account/update-account/update-account.component";
import { AccountSidebarComponent } from "./Pages/account/account-sidebar/account-sidebar.component";
import { ChatComponent } from "./Components/chat/chat.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: MainSidebarComponent,
        outlet: 'sidebar'
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            component: AccountSidebarComponent,
            outlet: 'sidebar'
          },
          {
            path: 'info',
            component: AccountInfoSidebarComponent,
            outlet: 'sidebar'
          },
          {
            path: 'update',
            component: UpdateAccountComponent,
            outlet: 'sidebar'
          }
        ]
      },
      {
        path: 'friends',
        component: FriendsSidebarComponent,
        outlet: 'sidebar'
      },
      {
        path: 'chat',
        component: ChatComponent
      }
    ]
  }
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomeRoutingModule { }