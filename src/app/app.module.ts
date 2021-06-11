import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { AuthService } from './auth.service'


import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CapitalizePipe } from './capitalize.pipe';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component';

import { NgxEditorModule } from 'ngx-editor';
import { HttpClientModule} from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { ViewComponent } from './view/view.component';
import { CommentsComponent } from './comments/comments.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

  let firebaseConfig = {
  apiKey: "AIzaSyDg0O7Z-J583_rnAIisyJktcZX3YrDSJ6U",
  authDomain: "feelfree-openup.firebaseapp.com",
  databaseURL: "https://feelfree-openup.firebaseio.com",
  projectId: "feelfree-openup",
  storageBucket: "feelfree-openup.appspot.com",
  messagingSenderId: "1044790575330",
  appId: "1:1044790575330:web:7df0f44a8d47f76b73debb",
  measurementId: "G-3RKRHJCWD4"
};
initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    CapitalizePipe,
    MenuComponent,
    MyblogsComponent,
    ProfileComponent,
    CreateComponent,
    PostComponent,
    ViewComponent,
    CommentsComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxEditorModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

