import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RoundButtonComponent } from '../round-button/round-button.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SidebarHeaderComponent } from './sidebar-header/sidebar-header.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { SettingsSidebarComponent } from './settings-sidebar/settings-sidebar.component';
import { FriendsSidebarComponent } from './friends-sidebar/friends-sidebar.component';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { SettingsFormComponent } from '../form/settings-form/settings-form.component';
import { FormModule } from '../form/form.module';

@NgModule({
  declarations: [
    SidebarHeaderComponent,
    MainSidebarComponent,
    SettingsSidebarComponent,
    FriendsSidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoundButtonComponent,
    SearchBarComponent,
    DropdownMenuComponent,
    FormModule
  ],
  exports: [
    MainSidebarComponent,
    SettingsSidebarComponent,
    FriendsSidebarComponent
  ]
})
export class SidebarModule { }
