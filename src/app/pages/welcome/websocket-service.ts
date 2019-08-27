import {Injectable} from '@angular/core';
import {QueueingSubject} from 'queueing-subject';
import makeWebSocketObservable from 'rxjs-websockets';
import {delay, map, retryWhen, share, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class WebsocketService {

  input = new QueueingSubject<object>();

  token = localStorage.getItem('id_token');

  url = environment.production ? `ws://${location.host}/ws?token=${this.token}` : `ws://localhost:9000/ws?token=${this.token}`;

  socket = makeWebSocketObservable(this.url);

  messages = this.socket.pipe(
    // the observable produces a value once the websocket has been opened
    switchMap(getResponses => getResponses(this.input.pipe(
      map(req => JSON.stringify(req))
      )).pipe(
      map(res => JSON.parse(res.toString())))
    ),
    retryWhen(errors => errors.pipe(delay(3000))),
    share(),
  );

  constructor() {

  }
}
