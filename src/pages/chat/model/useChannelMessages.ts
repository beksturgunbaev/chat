import { useModal } from "@/app/providers";
import { db } from "@/shared/utils/firebase";
import { showToast } from "@/shared/utils/toastify";
import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import type { IChannel, IChannelMessage } from "@/shared/types";
import { addDoc, arrayRemove, arrayUnion, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";

const useChannelMessages = () => {
    const { channelId } = useParams()
    const [searchParams] = useSearchParams();
    const channelName = searchParams.get("channel");
    const [channel, setChannel] = useState<IChannel | null>(null)
    const [text, setText] = useState<string>(''); // current input value
    const [loading, setLoading] = useState(false); // loading state for messages
    const [messages, setMessages] = useState<IChannelMessage[]>([]); // chat messages
    const messagesEndRef = useRef<HTMLDivElement>(null); // ref for scrolling to the last message

    const { activeModal, handleOpen, handleClose } = useModal()
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null; // current user

    // Subscribe to channel document
    useEffect(() => {
        if (!channelId) return;

        setLoading(true);

        const channelDocRef = doc(db, "channel", `${channelId}`);
        const unSubChannel = onSnapshot(channelDocRef, (docSnap) => {
            if (docSnap.exists()) {
                const channelData = docSnap.data() as IChannel;
                setChannel(channelData);
            }
            setLoading(false); // loading false only after data arrives
        });

        return () => unSubChannel();
    }, [channelId]);

    // Subscribe to messages only if user is a member
    useEffect(() => {
        if (!channel || !user?.uid) return;
        if (!channel.members.some(member => member.uid === user.uid)) return; // check subscription

        setLoading(true);

        const messagesRef = collection(db, "channel", `${channelId}`, "messages");
        const q = query(messagesRef, orderBy("createdAt", "asc"));

        const unsubMessages = onSnapshot(q, (snapshot) => {
            const msgs: IChannelMessage[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as IChannelMessage[];
            setMessages(msgs);
            setLoading(false); // loading false after messages arrived
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
        if (!channelId || !user?.uid) return;
        showToast({ message: 'Загрузка...', isLoading: true });
        try {
            const channelRef = doc(db, "channel", `${channelId}`);
            showToast({
                message: `Вы успешно подписаны на канал ${channel?.name}`,
                type: 'success',
                isLoading: false,
            });
            // add your uid to the field members, is it's not exists
            await updateDoc(channelRef, {
                members: arrayUnion({
                    uid: user.uid,
                    fullName: user.fullName,
                }),
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

    const unsubscribeFromChannel = async (text: string) => {
        if (!channelId || !user?.uid || !user?.fullName) return;
        showToast({ message: 'Загрузка...', isLoading: true });

        try {
            const channelRef = doc(db, "channel", `${channelId}`);
            showToast({
                message: `${text} ${channel?.name}`,
                type: 'success',
                isLoading: false,
            });
            await updateDoc(channelRef, {
                members: arrayRemove({
                    uid: user.uid,
                    fullName: user.fullName,
                }),
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

    const deleteFromChannel = async (member: { uid: string; fullName: string }) => {
        if (!channelId) return;
        showToast({ message: 'Загрузка...', isLoading: true });

        try {
            const channelRef = doc(db, "channel", channelId);
            handleClose();

            await updateDoc(channelRef, {
                members: arrayRemove(member),
            });

            showToast({
                message: `Вы успешно удалили ${member.fullName} из канала`,
                type: 'success',
                isLoading: false,
            });
        } catch (err) {
            showToast({
                message: 'Ошибка с сервера',
                type: 'error',
                isLoading: false,
            });
            console.error("Failed to remove member:", err);
        }
    };


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, [messages]);

    return {
        user,
        text,
        setText,
        channel,
        loading,
        messages,
        handleOpen,
        activeModal,
        sendMessage,
        channelName,
        messagesEndRef,
        deleteFromChannel,
        subscribeToChannel,
        unsubscribeFromChannel
    }
}

export default useChannelMessages
