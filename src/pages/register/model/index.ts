import { useState } from 'react';
import { auth, db } from '@/shared/utils/firebase';
import { showToast } from '@/shared/utils/toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const useRegister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        showToast({ message: 'Загрузка...', isLoading: true });

        try {
            // 1. Create a user to Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;
            const userData = {
                uid: user.uid,
                fullName: formData.fullName,
                email: formData.email,
                createdAt: serverTimestamp(),
                phone: '',
                avatar: ''
            }
            // 2. Save user's information to Firestore
            await setDoc(doc(db, 'users', `${user.uid}`), userData);
            localStorage.setItem("user", JSON.stringify(userData));
            showToast({
                message: 'Регистрация успешно выполнено!',
                type: 'success',
                isLoading: false,
            });
            window.location.href = '/chat';
        } catch (err: unknown) {
            let message = 'Ошибка с сервера';

            if (err && typeof err === 'object' && 'response' in err) {
                const error = err as { response?: { data?: { detail?: string } } };
                message = error.response?.data?.detail || message;
            } else if (err instanceof Error) {
                message = err.message;
            }

            showToast({
                message,
                type: 'error',
                isLoading: false,
            });
        }
    };

    return { formData, handleChange, handleSubmit };
};

export default useRegister;
