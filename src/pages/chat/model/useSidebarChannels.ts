import { useEffect, useState } from "react";
import { db } from "@/shared/utils/firebase";
import type { IChannel, IChannelList } from "@/shared/types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const useSidebarChannels = () => {
    const [channels, setChannels] = useState<IChannelList[]>([]);
    const [loading, setLoading] = useState(true);

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    useEffect(() => {
        if (!user?.uid) return;

        // get channels
        const q = query(collection(db, "channel"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newChannels: IChannelList[] = querySnapshot.docs.map((doc) => ({
                channelId: doc.id,
                data: doc.data() as IChannel,
                unreadMessagesCount: 0,
            }));
            setChannels(newChannels);

            // Get the count of unread messages
            newChannels.forEach((channel) => {
                const messagesRef = collection(db, "channel", `${channel.channelId}`, "messages");
                const unsubMessages = onSnapshot(messagesRef, (snap) => {
                    setChannels((prev) =>
                        prev.map((c) =>
                            c.channelId === channel.channelId
                                ? { ...c, unreadMessagesCount: snap.size }
                                : c
                        )
                    );
                });

                return unsubMessages;
            });

            setLoading(false);
        });

        return () => unsubscribe();
    }, [user?.uid]);

    return { user, loading, channels };
};

export default useSidebarChannels;
