import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { TokenService } from "./services/token.service";
import { UserService } from "./services/user.service";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./Pages/login/login.component";
import { RegisterComponent } from "./Pages/register/register.component";
import { AuthService } from "./services/auth.service";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        HttpClient,
        UserService,
        TokenService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }