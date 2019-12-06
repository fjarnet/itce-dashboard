import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private socketService: SocketService) { }

  ngOnInit() {
  }

}
