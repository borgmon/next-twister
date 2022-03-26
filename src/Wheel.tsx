import Typography from "@mui/material/Typography";
import { Box, Button, Card, CardContent } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useSpring, animated, easings } from "react-spring";
import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { Game, Player } from "./Core";
import { GameSetting } from "../pages";

const populatePi = (n: number) => {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push({ title: (i + 1).toString(), value: 1, color: COLORS[i] });
  }
  return result;
};

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const COLORS: string[] = [
  "#4dc9f6",
  "#f67019",
  "#f53794",
  "#537bc4",
  "#acc236",
  "#166a8f",
  "#00a950",
  "#58595b",
  "#8549ba",
];

export default function Wheel({
  gameSetting: gameSetting,
  setGameSetting: setGameSetting,
}: {
  gameSetting: GameSetting;
  setGameSetting: React.Dispatch<React.SetStateAction<GameSetting>>;
}) {
  const [angle, setAngle] = useState(0);
  const [isSpinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState({
    playerName: "",
    playerLimb: "",
    colorName: "",
    color: "",
  });
  const [spinResultPending, setSpinResultPending] = useState({
    playerName: "",
    playerLimb: "",
    colorName: "",
    color: "",
  });
  const randomAdjustment = () => {
    const eachSlotAngle = 360 / gameSetting.players.length;
    return randomInt(0, eachSlotAngle);
  };

  var anim = useSpring({
    from: {
      transform: `rotateZ(0deg)`,
    },
    to: {
      transform: `rotateZ(${angle}deg)`,
    },
    config: {
      duration: gameSetting.animationTime,
      easing: easings.easeOutQuad,
    },
    onRest: () => {
      setSpinning(false);
      setSpinResult(spinResultPending);
    },
  });

  const getNextSlot = () => {
    const result = gameSetting.game.next(gameSetting);
    setSpinResultPending({
      playerName: gameSetting.players[result.player].name,
      playerLimb: Player.intToLimb(result.limb),
      colorName: Game.intToColorString(result.color),
      color: Game.intToColor(result.color),
    });
    setGameSetting({
      ...gameSetting,
      game: gameSetting.game,
    });
    return result.player;
  };

  const onClickSpin = () => {
    if (isSpinning) {
      return;
    }
    const i = getNextSlot();
    const eachSlotAngle = 360 / gameSetting.players.length;
    const rotation = i * eachSlotAngle + 360 * randomInt(10, 100);
    setAngle(-rotation - randomAdjustment());
    setSpinning(true);
  };

  return (
    <Box>
      <Box>
        <Card sx={{ mt: 5 }} style={{ backgroundColor: spinResult.color }}>
          <CardContent>
            <Typography variant="h5" align="center">
              {spinResult.playerName === ""
                ? "Click the wheel to spin!"
                : "Player " +
                  spinResult.playerName +
                  " Put " +
                  spinResult.playerLimb +
                  " On " +
                  spinResult.colorName}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box fontSize="100px">
        <ArrowBackIosIcon
          fontSize="inherit"
          sx={{ transform: "rotate(270deg)", marginLeft: "38%" }}
        ></ArrowBackIosIcon>
      </Box>
      <Button onClick={onClickSpin}>
        <animated.div style={anim}>
          <Box sx={{ width: [270, 390, 450] }}>
            <PieChart
              data={populatePi(gameSetting.players.length)}
              label={({ dataEntry }) => dataEntry.title}
              startAngle={-90}
              animate
              labelStyle={{
                color: "white",
              }}
            />
          </Box>
        </animated.div>
      </Button>
    </Box>
  );
}
