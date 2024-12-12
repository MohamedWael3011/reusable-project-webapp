import { Button } from "../components/ui/button";

export const HomeView = () => {
  return (
    <div className="bg-background h-screen grid grid-cols-2">
      <div></div>
      <div className="flex flex-col justify-center items-center gap-20 bg-[#CEE0F3]">
        <div className="flex w-full justify-evenly">
          <Button size={"lg"}>Sign in</Button>
          <Button size={"lg"}>Sign up</Button>
        </div>
        <Button variant={"link"} size={"lg"}>
          Log in as Admin
        </Button>
      </div>
    </div>
  );
};
