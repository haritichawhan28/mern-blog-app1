import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthProvider"
import axios from 'axios'

export default function Login() {

    const [data, setData] = useState({
        username: '',
        password: '',
    })
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/authentication/login', {
                username: data.username,
                password: data.password, 
            })
            if(res.status === 200) {
                login();
                localStorage.setItem('username', data.username); 
                navigate('/home');
                alert('login successful')
            } else {
                setError('Invalid credentials')
            }
        } catch (error) {
            setError('Something went wrong!')
        }
    }

    return (
        <div className="p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {
                error &&
                <p className="text-red-500">
                    {error}
                </p>
            }
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="username" 
                        placeholder="username"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}