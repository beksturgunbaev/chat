import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/shared/utils/firebase";
import type { IUser } from "@/shared/types";
import { useNavigate } from "react-router-dom";

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

    return { clients, loading, navigate };
};

export default useSidebarNewChat;
