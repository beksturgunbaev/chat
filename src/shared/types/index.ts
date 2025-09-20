import type { Timestamp } from "firebase/firestore";

export interface IChat {
    lastMsgSenderUid: string;
    lastMsgSenderName: string;
    lastMsgSenderAvatar: string;
    lastMsgReceiverAvatar: string;
    lastMsgReceiverName: string;
    lastMsgReceiverUid: string;
    lastMsgRead: boolean;
    lastMsgTime: Timestamp;
    lastMsgText: string;
    users: string[]
}

export interface IChatList {
    chatId: string;
    data: IChat;
    unreadMessagesCount: number
}