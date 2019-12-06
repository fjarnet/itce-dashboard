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
  currentUser: User;

  constructor(
    private formBuilder: FormBuilder,
    private socketService: SocketService,
    private databaseService: DatabaseService
  ) {
    this.socketService.initSocket();
    //this.currentUser.firstName = 'John';
    //this.currentUser.lastName = 'Doe';

    this.whoForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl()
   });

    //this.form = this.formBuilder.group({
    //  firstName: '',
    //  lastName: ''
    //});
  }

  onSubmit(formData) {
    this.currentUser._id = 2;
    this.currentUser.firstName = formData.firstName;
    this.currentUser.lastName = formData.lastName;
    this.databaseService.sendUserData(this.currentUser).subscribe();
  }
}
