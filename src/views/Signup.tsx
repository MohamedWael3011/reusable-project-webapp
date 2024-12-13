import React, { useState } from "react";
import TextInput from "../components/ui/TextInput";
import { Button } from "../components/ui/button";
import Checkbox from "../components/ui/Checkbox";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../apis/user.api";

export const Signup = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, sethidePassword] = useState<boolean>(false);
  const [role, setRole] = useState<string>(""); // State for role selection
  const [error, setError] = useState<string | null>(null); // Error state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password && fullname && role) {
      try {
        const success = await createAccount(fullname, email, password);
        console.log("SuCCESS", success);
        if (success) {
          navigate("/signin"); // Navigate to sign-in after successful registration
        } else {
          setError("Failed to create account. Please try again.");
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        console.error(err);
      }
    } else {
      setError("All fields are required.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-40">
      <div className="bg-[#CEE0F3] p-20 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-primary text-2xl font-bold mb-6 text-center">
          Sign up
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Full name"
            placeholder="Enter your full name"
            required
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <TextInput
            label="Email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextInput
            label="Password"
            type={hidePassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Checkbox
            label="View Password"
            checked={hidePassword}
            onChange={() => sethidePassword(!hidePassword)}
          />

          <div className="mt-4">
            <p className="text-sm text-primary font-semibold mb-2">Role</p>

            <div className="flex items-center gap-4 w-full">
              <label className="flex items-center gap-2">
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="text-primary">User</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="role"
                  value="referee"
                  checked={role === "referee"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="text-primary">Referee</span>
              </label>
            </div>
          </div>

          <Button className="w-full mt-4" size={"lg"} type="submit">
            Sign up
          </Button>
        </form>

        <p className="mt-4 text-sm text-center text-primary">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};
