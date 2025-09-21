import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "@/shared/utils/firebase";
import type { IUser } from "@/shared/types";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/shared/utils/toastify";

const useSidebarNewChat = () => {
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState<IUser[]>([]);

    const navigate = useNavigate();
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    useEffect(() => {
        const fetchClients = async () => {
            if (!user) return;

            setLoading(true);

            try {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("uid", "!=", `${user.uid}`));
                const snapshot = await getDocs(q);

                const clientsData: IUser[] = snapshot.docs.map((doc) => ({
                    uid: doc.id,
                    ...doc.data(),
                } as IUser));

                setClients(clientsData);
            } catch (error) {
                console.error("Ошибка при получении клиентов:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    const handleCreateChat = async (el: IUser) => {
        try {
            const chatsRef = collection(db, "chat");

            // Check the chat
            const q = query(
                chatsRef,
                where("users", "in", [
                    [user?.uid, el?.uid],
                    [el?.uid, user?.uid],
                ])
            );

            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                // If chat is exists -> get chat ID
                const existingChatId = snapshot.docs[0].id;
                navigate(`/app/chat/${existingChatId}?user=${el?.uid}`);
            } else {
                // If chat is not exists -> create a chat
                showToast({ message: 'Создаём чат, ждите...', isLoading: true });
                const newChatRef = await addDoc(chatsRef, {
                    users: [user?.uid, el?.uid],
                    lastMsgText: "",
                    lastMsgTime: serverTimestamp(),
                    lastMsgRead: false,
                    lastMsgSenderUid: user.uid,
                    lastMsgSenderName: user.fullName,
                    lastMsgSenderAvatar: user.avatar,
                    lastMsgReceiverUid: el?.uid,
                    lastMsgReceiverName: el?.fullName,
                    lastMsgReceiverAvatar: el?.avatar,
                });
                showToast({
                    message: 'Чат успешно создан!',
                    type: 'success',
                    isLoading: false,
                });
                navigate(`/app/chat/${newChatRef.id}?user=${el?.uid}`);
            }
        } catch (error) {
            showToast({
                message: 'Ошибка при создании чата!',
                type: 'error',
                isLoading: false,
            });
            console.error("Ошибка при создании/поиске чата:", error);
        }
    };

    return { clients, loading, navigate, handleCreateChat };
};

export default useSidebarNewChat;
