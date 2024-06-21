import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./Pages/main/main.component";
import { HomeRoutingModule } from "./home-routing.module";
import { FormModule } from "../form/form.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FriendsSidebarComponent } from "./Pages/friends-sidebar/friends-sidebar.component";
import { SettingsSidebarComponent } from "./Pages/settings-sidebar/settings-sidebar.component";
import { MainSidebarComponent } from "./Pages/main-sidebar/main-sidebar.component";
import { ChatComponent } from "./Components/chat/chat.component";
import { DropdownMenuComponent } from "./Components/dropdown-menu/dropdown-menu.component";
import { RoundButtonComponent } from "./Components/round-button/round-button.component";
import { SearchBarComponent } from "./Components/search-bar/search-bar.component";
import { SidebarHeaderComponent } from "./Components/sidebar-header/sidebar-header.component";

@NgModule({
    declarations: [
        MainComponent,
        FriendsSidebarComponent,
        SettingsSidebarComponent,
        MainSidebarComponent,
        ChatComponent,
        DropdownMenuComponent,
        RoundButtonComponent,
        SearchBarComponent,
        SidebarHeaderComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule,
        FormModule,
        RouterModule
    ],
    providers: [
    ]
})

export class HomeModule { }