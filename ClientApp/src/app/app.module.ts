import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { ChatComponent } from "./modules/chat/chat.component";
import { SidebarModule } from "./modules/sidebar/sidebar.module";
import { AppRoutingModule } from "./app-routing.module";
import { TokenService } from "./services/token.service";
import { UserService } from "./services/user.service";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        ChatComponent,
        SidebarModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule
    ],
    providers: [
        HttpClient,
        UserService,
        TokenService
    ],
    bootstrap: [AppComponent]
})
//TODO: поменять архитекуру(pages и прочее) как у того чела в гитхаб
//TODO: заменить switch sidebars на перехды через маршрутизатор
export class AppModule { }