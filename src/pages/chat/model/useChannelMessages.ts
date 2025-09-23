import { db } from "@/shared/utils/firebase";
import { useEffect, useRef, useState } from "react";
import type { IChannelMessage } from "@/shared/types";
import { useParams, useSearchParams } from "react-router-dom";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";

const useChannelMessages = () => {
    const { channelId } = useParams()
    const [searchParams] = useSearchParams();
    const channelName = searchParams.get("channel");
    const [text, setText] = useState<string>(''); // current input value
    const [loading, setLoading] = useState(false); // loading state for messages
    const [messages, setMessages] = useState<IChannelMessage[]>([]); // chat messages
    const messagesEndRef = useRef<HTMLDivElement>(null); // ref for scrolling to the last message

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null; // current user

    useEffect(() => {
        if (!channelId) return;
        setLoading(true);

        const messagesRef = collection(db, "channel", `${channelId}`, "messages");
        const q = query(messagesRef, orderBy("createdAt", "asc")); // order messages by time ascending

        // Subscribe to realtime updates
        const unsub = onSnapshot(q, (snapshot) => {
            const msgs: IChannelMessage[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as IChannelMessage[];
            setMessages(msgs);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsub();
    }, [channelId]);

    const sendMessage = async () => {
        if (!text.trim()) return;

        const messageText = text; // clear the text
        setText(""); // clear input

        try {
            const messagesRef = collection(db, "channel", channelId!, "messages");

            await addDoc(messagesRef, {
                message: messageText,
                senderId: user?.uid,
                senderName: user?.fullName,
                createdAt: serverTimestamp(),
            });
        } catch (err) {
            console.error("Ошибка при отправке сообщения:", err);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, [messages]);

    return { user, text, setText, loading, messages, channelName, sendMessage, messagesEndRef }
}

export default useChannelMessages
