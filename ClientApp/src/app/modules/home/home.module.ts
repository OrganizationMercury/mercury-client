import { NgModule } from "@angular/core";
import { SidebarModule } from "../sidebar/sidebar.module";
import { ChatComponent } from "../chat/chat.component";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./Pages/main/main.component";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        SidebarModule,
        ChatComponent,
        CommonModule,
        HomeRoutingModule
    ],
    providers: [
    ]
})

export class HomeModule { }