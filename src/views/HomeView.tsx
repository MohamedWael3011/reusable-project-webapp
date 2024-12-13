import { Button } from "../components/ui/button";
import LOGO from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
export const HomeView = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    } else if (user?.Role === "Admin") {
      navigate("/admin");
    } else if (user?.Role === "User") {
      navigate("/user");
    } else {
      navigate("");
    }
  }, [navigate, user]);
  return (
    <div className="bg-background h-screen grid grid-cols-2">
      <div className="flex flex-col justify-center items-center gap-5">
        <img src={LOGO} className="w-[500px]" />
        <p className="text-primary text-3xl">Project Submission Portal</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-10 bg-[#CEE0F3]">
        <div className="flex w-full justify-evenly">
          <Button size={"lg"} onClick={() => navigate("signin")}>
            Sign in
          </Button>
          <Button size={"lg"} onClick={() => navigate("signup")}>
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};
