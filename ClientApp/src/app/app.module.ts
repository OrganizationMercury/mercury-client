import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "./app-routing.module";
import { TokenService } from "./services/common/token.service";
import { UserService } from "./services/common/user.service";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./Pages/login/login.component";
import { RegisterComponent } from "./Pages/register/register.component";
import { AuthService } from "./services/common/auth.service";
import { AppComponent } from "./app.component";
import { HomeRoutingModule } from "./modules/home/home-routing.module";
import { AuthInterceptor } from "./services/interceptors/auth.interceptor";
import { MessagesService } from "./services/common/messages.service";
import { SignalrService } from "./services/common/signalr.service";
import { ChatsService } from "./services/common/chats.service";
import { FileService } from "./services/common/file.service";
import { ChatCommunicator } from "./services/communicators/chat.communicator";

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
        ReactiveFormsModule,
        HomeRoutingModule
    ],
    providers: [
        HttpClient,
        UserService,
        FileService,
        TokenService,
        MessagesService,
        ChatsService,
        SignalrService,
        AuthService,
        ChatCommunicator,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }