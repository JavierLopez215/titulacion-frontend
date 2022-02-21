import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class UtillitiesService {

  socket !: Socket;
  constructor() {
     this.socket=io('http://localhost:3000', { transports : ['websocket'] });
   }

  TestingFunction(){
    
  }

  
  
  postUser(user:any) {
    console.log('emitir')
    this.socket.emit('post', {nombre:'user2'});
  }

 
  getUsers() {
    return new Observable(observer => {
      this.socket.on('get', data => {
        observer.next(data);
      });
    });
  }
}
