import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { Event } from '../model/event';

import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs/internal/Observable';
import { DatabaseService } from 'src/app/services/database.service';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
    private socket;
    public currentUser: User;

    constructor(
        private databaseService: DatabaseService,
    ) {}

    public initSocket(): void {
        this.socket = socketIo(environment.databaseServer);
        this.currentUser = {} as User;
        //this.currentUser.status = 'unknown';
        //this.currentUser.firstName = 'plop';
        // TODO
        //this.currentUser = {
        //    _id: 2,
        //    firstName: '',
        //    lastName: '',
        //    status: 'unknown'
        //}
        this.socket.on('identity', (data: User) => {
            this.currentUser = data;
            console.log(this.currentUser);
        });
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public onEvent(event: Event): Observable<any> {
        console.log('onEvent');
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
