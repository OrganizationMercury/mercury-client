import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./Pages/main/main.component";
import { HomeRoutingModule } from "./home-routing.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FriendsSidebarComponent } from "./Pages/friends-sidebar/friends-sidebar.component";
import { AccountInfoSidebarComponent } from "./Pages/account/account-info-sidebar/account-info-sidebar.component";
import { MainSidebarComponent } from "./Pages/main-sidebar/main-sidebar.component";
import { ChatComponent } from "./Components/chat/chat.component";
import { DropdownMenuComponent } from "./Components/dropdown-menu/dropdown-menu.component";
import { RoundButtonComponent } from "./Components/round-button/round-button.component";
import { SearchBarComponent } from "./Components/search-bar/search-bar.component";
import { SidebarHeaderComponent } from "./Components/sidebar-header/sidebar-header.component";
import { UpdateAccountComponent } from "./Pages/account/update-account/update-account.component";
import { AccountMainSidebarComponent } from './Pages/account/account-main-sidebar/account-main-sidebar.component';
import { RecommendationsSidebarComponent } from "./Pages/recommendations-sidebar/recommendations-sidebar.component";
import { UserProfileSidebarComponent } from "./Pages/account/user-profile-sidebar/user-profile-sidebar.component";

@NgModule({
    declarations: [
        MainComponent,
        FriendsSidebarComponent,
        AccountInfoSidebarComponent,
        MainSidebarComponent,
        ChatComponent,
        DropdownMenuComponent,
        RoundButtonComponent,
        SearchBarComponent,
        SidebarHeaderComponent,
        UpdateAccountComponent,
        AccountMainSidebarComponent,
        RecommendationsSidebarComponent,
        UserProfileSidebarComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        RouterModule
    ],
    providers: [
    ]
})

export class HomeModule { }