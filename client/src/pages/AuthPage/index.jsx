import React, { useState } from 'react';
import backgroundImg from '../../assets/auth-bg.jpg';
import AuthNavbar from '../../components/AuthNavbar';
import Register from '../../components/Register';
import Login from '../../components/Login';

export default function AuthPage() {
    const [isRegister, setIsRegister] = useState(true);

    const toggleDialog = () => {
        setIsRegister(!isRegister);
    };

    return (
        <div className="relative h-screen w-screen bg-cover bg-bottom" style={{ backgroundImage: `url(${backgroundImg})` }}>
            <AuthNavbar />
            <div className="flex flex-1 items-center justify-end p-8">
                <div className="w-full max-w-md backdrop-blur-lg bg-white/20 p-8 rounded-lg shadow-lg">
                    {isRegister ? <Register /> : <Login />}
                    <div className="flex justify-between">
                        <button onClick={toggleDialog} className="text-white hover:underline hover:text-slate-500">
                            {isRegister ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
