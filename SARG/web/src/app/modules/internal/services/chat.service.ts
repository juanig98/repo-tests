import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _chat$ = new BehaviorSubject<ChatType[]>([]);
  public chat$ = this._chat$.asObservable();
  private _room$ = new BehaviorSubject<string | null>(null);

  constructor(
    private authService: AuthService,
    //private socket: Socket,
  ) {
    console.log({ Authorization: `Bearer ${this.authService.getToken()}` });

    // this.socket.ioSocket.io.opts.query = { Authorization: `Bearer ${this.authService.getToken()}` };

    // socket.fromEvent('new_message').subscribe((message: any) => {
    //   const chatObject: ChatType = {
    //     user: {
    //       avatar: '',
    //       name: 'Anonymus',
    //       id: '0',
    //       slogan: '',
    //     },
    //     message,
    //   };
    //   this.setChat(chatObject);
    // });

    // socket.fromEvent('disconnect').subscribe(() => {
    //   const lastRoom = this._room$.getValue();
    //   if (lastRoom) this.joinRoom(lastRoom);
    // });
  }


  public setChat(message: ChatType): void {
    const current = this._chat$.getValue();
    const state = [...current, message];
    this._chat$.next(state);
  }

  public initChat(): void {
    this._chat$.next([]);
  }
  // sendMessage(payload: { message: string }) {

  //   payload = { ...payload };
  //   this.socket.emit('event_message', payload); //TODO FRONT

  // }

  // joinRoom(room: string): void {
  //   this._room$.next(room);
  //   this.socket.emit('event_join', room);
  // }

  // leaveRoom(): void {
  //   const room = this._room$.getValue();
  //   this.socket.emit('event_leave', room);
  // }

  // getMessage() {
  //   return this.socket.fromEvent('message');
  // }

}
interface UserType {
  name: string;
  avatar: string;
  slogan: string;
  id: string;
}

interface ChatType {
  user: UserType;
  message: string;
}
