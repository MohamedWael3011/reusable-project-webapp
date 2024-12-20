import React, { useState } from "react";
import TextInput from "../components/ui/TextInput";
import { Button } from "../components/ui/button";
import Checkbox from "../components/ui/Checkbox";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { logIn } from "../apis/user.api";

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await logIn(email, password);

        if (response.IsSuccess) {
          setUser({ name: response.Username ??"" , email, role: response.Role ?? "", id: response.Id! });
          console.log(response)
          setError(null);

          switch (response.Role) {
            case "admin":
              navigate("/admin");
              break;
            case "user":
              navigate("/user");
              break;
            case "referee":
              navigate("/referee");
              break;
            default:
              navigate("/");
          }
        } else {
          setError("An error occurred during login.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        setError("An unexpected error occurred during login. Please try again later.");
      }
    } else {
      setError("All fields are required.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-background px-40">
        <div className="bg-[#CEE0F3] p-20 rounded-md shadow-md w-full max-w-lg">
          <h2 className="text-primary text-2xl font-bold mb-6 text-center">Sign in</h2>
          <form onSubmit={handleSubmit}>
            <TextInput
              required
              label="Username or Email"
              placeholder="Enter your username or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextInput
              required
              label="Password"
              type={hidePassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Checkbox
              label="View Password"
              checked={hidePassword}
              onChange={() => setHidePassword(!hidePassword)}
            />

            <Button className="w-full mt-4" size={"lg"} type="submit">
              Sign in
            </Button>

            {error && (
              <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
            )}
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