import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./Pages/main/main.component";
import { MainSidebarComponent } from "./Pages/main-sidebar/main-sidebar.component";
import { AccountInfoSidebarComponent } from "./Pages/account/account-info-sidebar/account-info-sidebar.component";
import { FriendsSidebarComponent } from "./Pages/friends-sidebar/friends-sidebar.component";
import { UpdateAccountComponent } from "./Pages/account/update-account/update-account.component";
import { AccountMainSidebarComponent } from "./Pages/account/account-main-sidebar/account-main-sidebar.component";
import { RecommendationsSidebarComponent } from "./Pages/recommendations-sidebar/recommendations-sidebar.component";
import { UserProfileSidebarComponent } from "./Pages/account/user-profile-sidebar/user-profile-sidebar.component";
import { ChatComponent } from "./Components/chat/chat.component";
import { AddChatComponent } from "./Pages/add-chat/add-chat.component";

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
        path: 'account',
        component: AccountMainSidebarComponent,
        children: [
          {
            path: 'info',
            component: AccountInfoSidebarComponent
          },
          {
            path: 'update',
            component: UpdateAccountComponent
          },
          {
            path: 'profile/:id',
            component: UserProfileSidebarComponent
          }
        ]
      },
      {
        path: 'friends',
        component: FriendsSidebarComponent
      },
      {
        path: 'recommendations',
        component: RecommendationsSidebarComponent
      },
      {
        path: 'chat/:id',
        component: ChatComponent,
        outlet: 'main'
      },
      {
        path: 'user/:userId/chat',
        component: ChatComponent,
        outlet: 'main'
      },
      {
        path: 'chat/add',
        component: AddChatComponent
      }
    ]
  }
];
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class HomeRoutingModule { }