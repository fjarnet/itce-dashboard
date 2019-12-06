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

    constructor(
        private databaseService: DatabaseService,
    ) {}

    public initSocket(): void {
        this.socket = socketIo(environment.databaseServer);
        this.onMessage().subscribe((message: User) => {
            message.firstName = 'Prénom';
            message.lastName = 'Nom';
            console.log(message);
            this.databaseService.sendUserData(message).subscribe();
        });
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<User> {
        console.log('onMessage');
        return new Observable<User>(observer => {
            this.socket.on('identity', (data: User) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        console.log('onEvent');
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
