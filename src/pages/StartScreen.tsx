import TitleCanvas from "../components/StartScreen/TitleCanvas";
import { lazy, Suspense } from "react";

const TitleText = lazy(() => import("../components/StartScreen/TitleText"));

const StartScreen: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center ">
      <div className="h-1/2 w-full">
        <TitleCanvas>
          <Suspense fallback={null}>
            <TitleText>Snake 3D</TitleText>
          </Suspense>
        </TitleCanvas>
      </div>
      <div className="py-8">Menu</div>
      <button className="bg-sky-600 p-4 text-white rounded ">Start game</button>
    </div>
  );
};

export default StartScreen;
