import GameCanvas from "../components/GameScreen/GameCanvas";

const StartScreen: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center ">
      game screen
      <GameCanvas />
    </div>
  );
};

export default StartScreen;
