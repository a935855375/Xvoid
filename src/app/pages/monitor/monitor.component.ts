import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  markdown =
    `
\`\`\`cpp
class Logical_clock
{
   int64 state;  // 该值存储着事务提交的逻辑时间
   int64 offset; // 每次binlog切换时，都记录当前的state，用于计算一个binlog中lock-interval的相对逻辑时间
}

// Gtid_event记录在binlog event的头部，是一个相对的逻辑时间，每个binlog都从0开始，在flush阶段产生
class Gtid_event: public Binary_log_event
{
  long long int last_committed; // binlog event里面存储的lock-interval起始点 取自Transaction_ctx的last_committed
  long long int sequence_number; // binlog event里面存储的lock-interval终止点 取自Transaction_ctx的sequence_number
}

// 事务上下文，里面存储的是当前事务记录的prepare和commit的逻辑时间，是一个绝对的逻辑时间
class Transaction_ctx
{
    int64 last_committed;//事务完成prepare便会从MYSQL_BIN_LOG中的max_committed_transaction.state中获取到这个值，表示事务完成prepare的逻辑时间
    int64 sequence_number;//事务完成commit便会增加transaction_counter.state的值，并把该值赋给sequence_number，表示事务完成commit的逻辑时间
}

// MYSQL_BIN_LOG类存储着当前正在进行组提交的逻辑时间，是一个绝对的逻辑时间
class MYSQL_BIN_LOG: public TC_LOG
{
   Logical_clock m_max_committed_transaction; //记录最后一次组提交的事务中最大sequence_number，每次事务进行DML操作，都会用这个值来更新自己的last_committed，用于记录自己完成prepare的时间点
   Logical_clock m_transaction_counter; //记录当前提交组里面正在提交的事务的逻辑时间，每次事务完成flush，该值都会自增1。
}
\`\`\`
    `;
}
