import React, { useState } from 'react';
import TextInput from "../components/ui/TextInput";
import { Button } from "../components/ui/button";
import Checkbox from "../components/ui/Checkbox";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

  const [Fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hidePassword, sethidePassword] = useState<boolean>(false);
  const [role, setRole] = useState<string>(''); // State for role selection

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault(); 
    if (email && password && Fullname && role) {
      navigate("signin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-40">
        <div className="bg-[#CEE0F3] p-20 rounded-md shadow-md w-full max-w-lg">
            <h2 className="text-primary text-2xl font-bold mb-6 text-center">Sign in</h2>
            
            <form onSubmit={handleSubmit}>
                
                <TextInput  label='Full name' placeholder="Enter your full name" required
                    value={Fullname} onChange={(e)=>{ setFullname(e.target.value)}}/>
                    
                <TextInput  label='Email' placeholder="Enter your email" required
                    value={email} onChange={(e)=>{ setEmail(e.target.value)}}/>  

                <TextInput  label='Password' type={hidePassword? "text" :"password"} placeholder="Enter your username or email" required
                    value={password} onChange={(e)=>{ setPassword(e.target.value)}}/>
            
                <Checkbox label='View Password' checked={hidePassword} onChange={() => sethidePassword(!hidePassword)} />



                <div className="mt-4">
                    <p className="text-sm text-primary font-semibold mb-2">Role</p>
                    
                    <div className="flex items-center gap-4 w-full">
                        
                        <label className="flex items-center gap-2">
                            <input  className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer 
                                ${role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                                type="radio" name="role" value="user" checked={role === 'user'} onChange={(e) => setRole(e.target.value)}/>
                            <span className='text-primary'>User</span>
                        </label>

                        <label  className="flex items-center gap-2">
                            <input  className={`flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer 
                                ${role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                                type="radio" name="referee" value="referee" checked={role === 'referee'} onChange={(e) => setRole(e.target.value)}/>
                            <span className='text-primary'>referee</span>
                        </label>

                    </div>
                </div>


                <Button className="w-full mt-4" size={"lg"}  type='submit'>
                    Sign up
                </Button>

            </form>

            <p className="mt-4 text-sm text-center text-primary">
                Already have an account?{" "}
                <a href="/signin" className="text-blue-500 hover:underline">
                    Sign up
                </a>
            </p>
        </div>
        </div>

  );
};
