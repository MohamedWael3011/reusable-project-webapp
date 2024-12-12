import React, { useState } from 'react';
import TextInput from "../components/ui/TextInput";
import { Button } from "../components/ui/button";
import Checkbox from "../components/ui/Checkbox";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hidePassword, sethidePassword] = useState<boolean>(false);

  const HandleSubmit = () => {
    console.log(email);
    console.log(password);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-background px-40">
        <div className="bg-[#CEE0F3] p-20 rounded-md shadow-md w-full max-w-lg">
          <h2 className="text-primary text-2xl font-bold mb-6 text-center">Sign in</h2>
          <form onSubmit={HandleSubmit}>
            <TextInput
              label="Username or Email"
              placeholder="Enter your username or email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <TextInput
              label="Password"
              type={hidePassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Checkbox
              label="View Password"
              checked={hidePassword}
              onChange={() => sethidePassword(!hidePassword)}
            />

            <Button className="w-full mt-4" size={"lg"} onClick={() => navigate("Home")}>
              Sign in
            </Button>
          </form>

          <p className="mt-4 text-sm text-center text-primary">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
