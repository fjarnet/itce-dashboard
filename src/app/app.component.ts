import { User } from './model/user';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SocketService } from './services/socket.service';
import { DatabaseService } from './services/database.service';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard';
  //form;
  whoForm;
  faSave = faSave;
  currentUser;

  constructor(
    private formBuilder: FormBuilder,
    private socketService: SocketService,
    private databaseService: DatabaseService
  ) {
    this.socketService.initSocket();
    this.currentUser = this.socketService.currentUser;

    this.whoForm = new FormGroup({
      firstName: new FormControl(this.currentUser.firstName),
      lastName: new FormControl(this.currentUser.lastName)
   });

    //this.form = this.formBuilder.group({
    //  firstName: '',
    //  lastName: ''
    //});
  }

  userIsAnonymous() {
    return true;
    return this.currentUser.status == 'unknown';
  }

  userIsLoggedIn() {
    return true;
    return this.currentUser.status != 'unknown';
  }

  onSubmit(formData) {
    let databaseStatus = this.databaseService.sendUserData({
      _id: this.socketService.currentUser._id,
      firstName: formData.firstName,
      lastName: formData.lastName
    }).subscribe();
  }
}
