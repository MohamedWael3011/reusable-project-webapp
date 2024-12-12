import { Button } from "../components/ui/button";

export const HomeView = () => {
  return (
    <div className="bg-background h-screen grid grid-cols-2">
      <div></div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex">
          <Button />
          <Button />
        </div>
      </div>
    </div>
  );
};
