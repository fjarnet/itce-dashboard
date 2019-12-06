import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { SocketService } from 'src/app/services/socket.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [SocketService, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
