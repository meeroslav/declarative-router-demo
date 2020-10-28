import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RoutingModule } from 'angular-routing';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SelectUserComponent } from './select-user/select-user.component';
import { MediaModule } from 'ng-helpers';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    UserComponent,
    UserListComponent,
    UserProfileComponent,
    NotFoundComponent,
    SelectUserComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule.forRoot(),
    MediaModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
