import { Button } from "../components/ui/button";
import LOGO from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
export const HomeView = () => {
  const navigate = useNavigate();
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
        <Button variant={"link"} size={"lg"}>
          Log in as Admin
        </Button>
      </div>
    </div>
  );
};
