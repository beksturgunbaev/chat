import type { Timestamp } from "firebase/firestore";

export type ReadStatus = Record<string, Timestamp>;

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

export interface IMessage {
    id: string;
    text: string;
    senderUid: string;
    receiverUid: string;
    read: boolean;
    time: Timestamp;
}

export interface IUser {
    uid: string;
    fullName: string;
    avatar: string;
    time: Timestamp;
    phone: string;
    email: string;
}

export interface IChannelList {
    channelId: string;
    data: IChannel;
    unreadMessagesCount: number
}

export interface IChannel {
    owner: string;
    createdAt: Timestamp;
    name: string;
    ownerName: string;
    members: string[];
    readStatus: ReadStatus;
}

export interface IChannelMessage {
    id: string;
    message: string;
    senderId: string;
    senderName: string;
    createdAt: Timestamp;
}