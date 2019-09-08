import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Message} from '../../entity/message';
import {WebsocketService} from './websocket-service';
import {Subscription, timer} from 'rxjs';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  messages: Message[] = [];

  msg = '';

  subscription: Subscription;

  heartbeatSub: Subscription;

  disableScrollDown = false;

  down = false;

  memberCount = 0;

  uid: number;

  @ViewChild('scrollMe', {static: true}) private myScrollContainer: ElementRef;

  constructor(private webSocketService: WebsocketService,
              private notification: NzNotificationService,
              private message: NzMessageService) {
    this.uid = Number(localStorage.getItem('uid'));
  }

  sendMsg() {
    if (this.msg != '') {
      this.down = true;
      const message = Message.generateCommonMessage(Message.USER_INPUT_MESSAGE, this.msg);
      this.webSocketService.input.next(message);
      this.msg = '';
    }
  }

  ngOnInit() {
    const message = Message.generateCommonMessage(Message.USER_ENTER_MESSAGE);

    this.webSocketService.input.next(message);

    this.subscription = this.webSocketService.messages.subscribe((msg: Message) => {

      switch (msg.type) {
        case Message.USER_INPUT_MESSAGE:
          this.messages.push(msg as Message);
          break;
        case Message.GLOBAL_MESSAGE:
          msg.title = msg.title ? msg.title : '';
          this.notification.blank(
            msg.title,
            msg.content
          );
          break;
        case Message.USER_ENTER_MESSAGE:
        case Message.USER_LEAVE_MESSAGE:
          this.memberCount = msg.memberCount;
          if (msg.uid != this.uid) {
            const message = `${msg.nickname} ${msg.type == Message.USER_ENTER_MESSAGE ? 'enter' : 'leave'} the chat room.`;
            this.message.info(message);
          }
          break;
      }
    }, () => {
      console.log('Something go wrong..');
    }, () => {
      console.log('Connection is closed!');
    });

    this.heartbeatSub = timer(10000, 10000).subscribe(_ => {
      this.webSocketService.input.next(Message.generateCommonMessage(Message.HEART_BEAT));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.heartbeatSub.unsubscribe();
  }

  onScroll() {
    let element = this.myScrollContainer.nativeElement;
    this.disableScrollDown = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) > 30;
  }

  scrollToBottom() {
    if (this.disableScrollDown && !this.down) {
      return;
    }

    this.down = false;

    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  };
}
