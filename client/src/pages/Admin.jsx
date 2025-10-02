import React from 'react'
import { useState } from 'react'
import API from '../services/api';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const Admin = () => {

    const [users,setUsers] = useState([]);
    const fetchUsers = async()=>{

        try {
            const response = await API.get("/admin/users");
        if (response.data){
            setUsers(response.data)
            toast.success("users fetched")
        }
            
        } catch (error) {
            toast.error("error occurred")
            
        }

        

    }

    const deleteUser = async(id)=>{

        try {

            const response = await API.delete(`/admin/users/${id}`)

            if (response){
                toast.success("user deleted successfully!")
                fetchUsers()
                
            }
            
        } catch (error) {
            console.log(error)
            
        }

    }

    useEffect(()=>{

        fetchUsers();

    },[])
    
  return (
    <div>
        <h1>Admin</h1>

        {users && 
      
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.role}</td>
                <td className="border p-2">
                  <button 
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => deleteUser(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        }
      
    </div>
  )
}

export default Admin
