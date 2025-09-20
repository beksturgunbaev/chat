import { useEffect, useState } from "react";
import { db } from "@/shared/utils/firebase";
import { useParams } from "react-router-dom";
import type { IMessage } from "@/shared/types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const useChatMessages = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loading, setLoading] = useState(false);

    const { chatId } = useParams()
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    useEffect(() => {
        if (!chatId) return;
        setLoading(true)
        const messagesRef = collection(db, "chat", `${chatId}`, "messages");
        const q = query(messagesRef, orderBy("time", "asc"));

        const unsub = onSnapshot(q, (snapshot) => {
            const msgs: IMessage[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as IMessage[];
            setMessages(msgs);
            setLoading(false);
        });

        return () => unsub();
    }, [chatId]);

    return { messages, user, loading };
};

export default useChatMessages;