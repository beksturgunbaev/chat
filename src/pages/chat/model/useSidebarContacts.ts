import { useEffect, useState } from "react";
import { db } from "@/shared/utils/firebase";
import type { IChat, IChatList } from "@/shared/types";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";

const useSidebarContacts = () => {
    const [chats, setChats] = useState<IChatList[] | []>([]);
    const [loading, setLoading] = useState(true);

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    useEffect(() => {
        if (!user?.uid) return;

        const unsubscribeChats: (() => void)[] = [];
        const unsubscribeMessages: (() => void)[] = [];

        const chatsRef = collection(db, "chat");
        const q = query(
            chatsRef,
            where("users", "array-contains", user.uid),
            orderBy("lastMsgTime", "desc")
        );

        const unsub = onSnapshot(q, async (querySnapshot) => {
            unsubscribeMessages.forEach(fn => fn());
            unsubscribeMessages.length = 0;

            const chatsWithUnread = await Promise.all(
                querySnapshot.docs.map(async doc => {
                    const chatId = doc.id;
                    const chatData = doc.data() as IChat;

                    const messagesRef = collection(db, "chat", chatId, "messages");
                    const messagesQuery = query(
                        messagesRef,
                        where("lastMsgRead", "==", false),
                        where("lastMsgSenderUid", "==", user.uid)
                    );

                    const snapshot = await getDocs(messagesQuery);

                    const unsubMsg = onSnapshot(messagesQuery, snap => {
                        setChats(prev =>
                            prev.map(c =>
                                c.chatId === chatId
                                    ? { ...c, unreadMessagesCount: snap.size }
                                    : c
                            )
                        );
                    });

                    unsubscribeMessages.push(unsubMsg);

                    return {
                        chatId,
                        data: chatData,
                        unreadMessagesCount: snapshot.size,
                    };
                })
            );
            setChats(chatsWithUnread);
            setLoading(false);
        });

        unsubscribeChats.push(unsub);

        return () => {
            unsubscribeChats.forEach(fn => fn());
            unsubscribeMessages.forEach(fn => fn());
        };
    }, [user?.uid]);


    return { user, chats, loading };
};

export default useSidebarContacts;
