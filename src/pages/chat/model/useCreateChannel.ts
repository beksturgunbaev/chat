import { useState } from "react";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "@/shared/utils/firebase";
import { useModal } from "@/app/providers";
import { showToast } from "@/shared/utils/toastify";

export interface CreateChannelData {
    name: string;
    owner: string;
    ownerName: string;
    createdAt?: Timestamp;
    members: string[];
}

export const useCreateChannel = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const { handleClose } = useModal();

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const createChannel = async ({ data }: { data: Partial<CreateChannelData> }) => {
        setLoading(true);
        showToast({ message: 'Создаём канал, ждите...', isLoading: true });
        try {
            const channelsRef = collection(db, "channel");
            await addDoc(channelsRef, {
                ...data,
                createdAt: serverTimestamp(),
                readStatus: { [user.uid]: serverTimestamp() },
            });
            showToast({
                message: 'Канал успешно создан!',
                type: 'success',
                isLoading: false,
            });
        } catch (err) {
            showToast({
                message: 'Ошибка при создании чата!',
                type: 'error',
                isLoading: false,
            });
            console.error("Error creating channel:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const sendData: Partial<CreateChannelData> = {
            name,
            owner: user.uid,
            ownerName: user.fullName,
            members: [user.uid],
        };

        await createChannel({ data: sendData });
        handleClose();
    };

    return { name, setName, loading, handleSubmit };
};
