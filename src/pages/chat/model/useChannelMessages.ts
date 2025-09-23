import { db } from "@/shared/utils/firebase";
import { useEffect, useRef, useState } from "react";
import type { IChannel, IChannelMessage } from "@/shared/types";
import { useParams, useSearchParams } from "react-router-dom";
import { addDoc, arrayRemove, arrayUnion, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { showToast } from "@/shared/utils/toastify";

const useChannelMessages = () => {
    const { channelId } = useParams()
    const [searchParams] = useSearchParams();
    const channelName = searchParams.get("channel");
    const [channel, setChannel] = useState<IChannel | null>(null)
    const [text, setText] = useState<string>(''); // current input value
    const [loading, setLoading] = useState(false); // loading state for messages
    const [messages, setMessages] = useState<IChannelMessage[]>([]); // chat messages
    const messagesEndRef = useRef<HTMLDivElement>(null); // ref for scrolling to the last message

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null; // current user

    // Subscribe to channel document
    useEffect(() => {
        if (!channelId) return;
        setLoading(true);

        const channelDocRef = doc(db, "channel", channelId);
        const unSubChannel = onSnapshot(channelDocRef, (docSnap) => {
            if (docSnap.exists()) {
                const channelData = docSnap.data() as IChannel;
                setChannel(channelData);
            }
        });

        return () => unSubChannel();
    }, [channelId]);

    // Subscribe to messages only if user is a member
    useEffect(() => {
        if (!channel || !user?.uid) return;
        if (!channel.members.includes(user.uid)) return; // check subscription

        const messagesRef = collection(db, "channel", `${channelId}`, "messages");
        const q = query(messagesRef, orderBy("createdAt", "asc"));

        const unsubMessages = onSnapshot(q, (snapshot) => {
            const msgs: IChannelMessage[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as IChannelMessage[];
            setMessages(msgs);
            setLoading(false);
        });

        return () => unsubMessages();
    }, [channel, channelId, user?.uid]);


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

    const subscribeToChannel = async () => {
        showToast({ message: 'Идет загрузка...', isLoading: true });
        if (!channelId || !user?.uid) return;

        try {
            const channelRef = doc(db, "channel", `${channelId}`);
            // add your uid to the field members, is it's not exists
            await updateDoc(channelRef, {
                members: arrayUnion(user?.uid),
            });
            showToast({
                message: `Вы успешно подписаны на канал ${channel?.name}`,
                type: 'success',
                isLoading: false,
            });
        } catch (err) {
            showToast({
                message: 'Ошибка с сервера',
                type: 'error',
                isLoading: false,
            });
            console.error("Failed to subscribe to channel:", err);
        }
    };

    const unsubscribeFromChannel = async () => {
        showToast({ message: 'Идет загрузка...', isLoading: true });
        if (!channelId || !user?.uid) return;

        try {
            const channelRef = doc(db, "channel", `${channelId}`);
            // remove your uid from the field members
            await updateDoc(channelRef, {
                members: arrayRemove(user.uid),
            });
            showToast({
                message: `Вы отписались от канала ${channel?.name}`,
                type: 'success',
                isLoading: false,
            });
        } catch (err) {
            showToast({
                message: 'Ошибка с сервера',
                type: 'error',
                isLoading: false,
            });
            console.error("Failed to unsubscribe from channel:", err);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, [messages]);

    return { user, text, setText, channel, loading, messages, channelName, sendMessage, messagesEndRef, subscribeToChannel, unsubscribeFromChannel }
}

export default useChannelMessages
