import React, { useState } from 'react'

const useRegister = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        fullName: ''
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

export default useRegister
