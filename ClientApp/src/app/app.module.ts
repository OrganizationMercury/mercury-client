import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
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
export class AppModule { }