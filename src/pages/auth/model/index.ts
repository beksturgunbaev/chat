import React, { useState } from 'react'
import { FirebaseError } from 'firebase/app';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/shared/utils/firebase';
import { showToast } from '@/shared/utils/toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';

const useAuth = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        showToast({ message: 'Загрузка...', isLoading: true });
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            const userRef = doc(db, 'users', `${user.uid}`);
            const userSnap = await getDoc(userRef);

            // Check account existence check
            if (userSnap.exists()) {
                const userData = userSnap.data();
                localStorage.setItem("user", JSON.stringify(userData));
                showToast({
                    message: 'Авторизация прошла успешно!',
                    type: 'success',
                    isLoading: false,
                });
                window.location.href = '/chat';
            } else {
                showToast({ message: 'Пользователь не найден в базе данных', type: 'error', isLoading: false });
            }
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                if (error.code === "auth/invalid-credential") {
                    showToast({
                        message: "Неправильный email или пароль",
                        type: "error",
                        isLoading: false,
                    });
                } else {
                    showToast({
                        message: `Ошибка при авторизации: ${error.message}`,
                        type: "error",
                        isLoading: false,
                    });
                }
            } else {
                showToast({
                    message: "Неизвестная ошибка",
                    type: "error",
                    isLoading: false,
                });
            }
        };
    };

    return { formData, handleChange, handleSubmit }
}
export default useAuth
