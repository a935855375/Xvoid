/**
 * 1 => user input message
 */
export class Message {
  id: number = 0;
  type: number;
  content: string | null | undefined;
  time: number;
  uid: number;
  nickname: string | null | undefined;
  title: string | null | undefined;
  memberCount: number | null | undefined;

  static HEART_BEAT = 0;

  static USER_INPUT_MESSAGE = 1;

  static USER_ENTER_MESSAGE = 2;

  static GLOBAL_MESSAGE = 3;

  static USER_LEAVE_MESSAGE = 4;

  static generateCommonMessage(type: number, content ?: string, time?: number, fromUser ?: number): Message {
    const message = new Message();
    message.type = type;

    if (content) {
      message.content = content;
    } else {
      message.content = '';
    }

    if (time) {
      message.time = time;
    } else {
      message.time = (new Date()).getTime();
    }

    if (fromUser) {
      message.uid = fromUser;
    } else {
      message.uid = Number(localStorage.getItem('uid'));
    }

    return message;
  }
}
