import React, { useState } from 'react'

const useAuth = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login data:', formData);
    };

    return { formData, handleChange, handleSubmit }
}

export default useAuth
