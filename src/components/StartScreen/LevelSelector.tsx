import { defaultRecordsState, lskeys } from "helpers/ls";
import { level1, level2, level3, level4 } from "hooks/useSnake/levels";
import { useLocalStorage } from "react-use";
import LevelOption from "./LevelOption";

const LevelSelector = () => {
  const [record] = useLocalStorage(lskeys.records, defaultRecordsState);

  return (
    <div className="max-w-sm grid grid-cols-2 mt-2 mb-8 gap-2 items-center justify-center">
      <LevelOption
        id="level-1"
        name="levelSelect"
        title="Level 1"
        value="level1"
        obstacleBlocks={level1(20).obstacleBlocks}
        defaultChecked
        record={record?.level1 ?? 0}
      />
      <LevelOption
        value="level2"
        obstacleBlocks={level2(20).obstacleBlocks}
        id="level-2"
        name="levelSelect"
        title="Level 2"
        record={record?.level2 ?? 0}
      />
      <LevelOption
        value="level3"
        obstacleBlocks={level3(20).obstacleBlocks}
        id="level-3"
        name="levelSelect"
        title="Level 3"
        record={record?.level3 ?? 0}
      />
      <LevelOption
        value="level4"
        obstacleBlocks={level4(20).obstacleBlocks}
        id="level-4"
        name="levelSelect"
        title="Level 4"
        record={record?.level4 ?? 0}
      />
    </div>
  );
};

export default LevelSelector;
