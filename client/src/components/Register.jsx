import { useState } from "react"
import axios from 'axios'

export default function Register () {

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setData({
      ...data, 
      [e.target.name]: e.target.value 
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password and confirm password matching
    if(data.password !== data.confirmPassword) {
      setError('Passwords do not match')
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/authentication/register', {
        username: data.username,
        email: data.email, 
        password: data.password,
      });
      console.log(res.data);
      alert('User registered successfully')
      console.clear();
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    }
  }

    return (
        <div className="p-8 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
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
                type="text" 
                placeholder="Username"
                name="username"
                value={data.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="email" 
                placeholder="Email" 
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" >Password</label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="password" 
                placeholder="Password" 
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="password" 
                placeholder="Confirm Password" 
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button 
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
      </div>
    )
}