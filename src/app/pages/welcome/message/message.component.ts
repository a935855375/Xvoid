import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {Message} from '../../../entity/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewInit {

  @Input('messages')
  messages: Message[];

  @Output()
  renderFinish: EventEmitter<any> = new EventEmitter();

  @ViewChildren('messages') bug: QueryList<any>;

  uid: number;

  constructor() {
  }

  ngOnInit() {
    this.uid = Number(localStorage.getItem('uid'));
  }

  ngAfterViewInit() {
    this.bug.changes.subscribe(_ => this.renderFinish.next());
  }

  color: string = '#00a2ae';

}
