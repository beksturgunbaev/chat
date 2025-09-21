import { useEffect, useRef, useState } from "react";
import { db } from "@/shared/utils/firebase";
import type { IMessage, IUser } from "@/shared/types";
import { useParams, useSearchParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, updateDoc, writeBatch } from "firebase/firestore";

const useChatMessages = () => {
    const [text, setText] = useState<string>(''); // current input value
    const [loading, setLoading] = useState(false); // loading state for messages
    const [receiver, setReceiver] = useState<IUser>(); // recipient user
    const [messages, setMessages] = useState<IMessage[]>([]); // chat messages

    const { chatId } = useParams(); // get chatId from URL
    const [searchParams] = useSearchParams(); // get search params from URL
    const clientId = searchParams.get("user"); // userId of the recipient
    const messagesEndRef = useRef<HTMLDivElement>(null); // ref for scrolling to the last message

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null; // current user

    // Fetch messages in real-time
    useEffect(() => {
        if (!chatId) return;
        setLoading(true);

        const messagesRef = collection(db, "chat", `${chatId}`, "messages");
        const q = query(messagesRef, orderBy("time", "asc")); // order messages by time ascending

        // Subscribe to realtime updates
        const unsub = onSnapshot(q, (snapshot) => {
            const msgs: IMessage[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as IMessage[];
            setMessages(msgs);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsub();
    }, [chatId]);

    // Fetch recipient user info
    useEffect(() => {
        const getUserById = async () => {
            try {
                const userRef = doc(db, "users", `${clientId}`);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    setReceiver(userSnap.data() as IUser); // set receiver data
                } else {
                    alert("User not found");
                    return null;
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                return null;
            }
        };
        if (clientId) {
            getUserById();
        }
    }, [clientId]);

    // Send a message and update chat document atomically
    const sendMessage = async () => {
        if (!text.trim()) return;

        const messageText = text; // store text before clearing input
        setText(""); // clear input immediately

        try {
            const chatRef = doc(db, "chat", `${chatId}`);
            const messagesRef = collection(db, "chat", `${chatId}`, "messages");

            const batch = writeBatch(db); // batch to update chat and add message simultaneously

            // Chat document data
            const chatData = {
                lastMsgSenderUid: user.uid,
                lastMsgSenderName: user.fullName,
                lastMsgReceiverUid: receiver?.uid,
                lastMsgReceiverName: receiver?.fullName,
                lastMsgText: messageText,
                lastMsgRead: false,
                lastMsgTime: serverTimestamp(),
                users: [user.uid, receiver?.uid],
            };

            // Update or create chat document
            batch.set(chatRef, chatData, { merge: true });

            // Create new message document with auto-ID
            const newMessageRef = doc(messagesRef);
            batch.set(newMessageRef, {
                text: messageText,
                senderUid: user.uid,
                receiverUid: receiver?.uid,
                read: false,
                time: serverTimestamp(),
            });

            // Commit both operations atomically
            await batch.commit();
        } catch (err) {
            console.error("Error sending message:", err);
        } finally {
            setText(""); // ensure input is cleared
        }
    };

    const markChatAsRead = async (chatId: string) => {
        try {
            if (!chatId) return;

            // 1. Обновляем поле lastMsgRead в документе чата
            const chatRef = doc(db, "chat", `${chatId}`);
            await updateDoc(chatRef, { lastMsgRead: true });

            // 2. Обновляем все сообщения в коллекции messages
            const messagesRef = collection(db, "chat", `${chatId}`, "messages");
            const snapshot = await getDocs(messagesRef);

            const promises = snapshot.docs.map((messageDoc) =>
                updateDoc(messageDoc.ref, { read: true })
            );

            await Promise.all(promises);

            console.log("Все сообщения и чат помечены как прочитанные ✅");
        } catch (error) {
            console.error("Ошибка при обновлении статуса сообщений:", error);
        }
    };

    useEffect(() => {
        if (chatId) {
            markChatAsRead(chatId);
        }
    }, [chatId]);

    // Scroll to the last message when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, [messages]);

    return { messages, user, text, receiver, loading, setText, sendMessage, messagesEndRef };
};

export default useChatMessages;
