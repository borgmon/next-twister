import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Box, Button, Card, CardContent } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SettingDrawer from "./SettingDrawer";
import { GameState } from "../pages";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useSpring, animated, to, easings, useSpringRef } from "react-spring";
import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { Game, Player } from "./Core";

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

export default function Wheel({ gameState }: { gameState: GameState }) {
  const [spin, setSpin] = useState(0);
  const [isSpinning, setSpinning] = useState(false);
  const [game, setGame] = useState(new Game(gameState.colors, gameState.rows));
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
    if (spin === 0) {
      return 0;
    }
    const eachSlotAngle = 360 / gameState.players.length;
    return randomInt(0, eachSlotAngle);
  };

  var anim = useSpring({
    from: {
      transform: `rotateZ(0deg)`,
    },
    to: {
      transform: `rotateZ(${spin}deg)`,
    },
    config: {
      duration: 5000,
      easing: easings.easeInOutExpo,
    },
    onRest: () => {
      setSpinning(false);
      setSpinResult(spinResultPending);
    },
  });

  const getNextSlot = () => {
    const result = game.next(gameState);
    setSpinResultPending({
      playerName: gameState.players[result.player].name,
      playerLimb: Player.intToLimb(result.limb),
      colorName: Game.intToColorString(result.color),
      color: Game.intToColor(result.color),
    });
    setGame(game);
    return result.player;
  };

  const onClickSpin = () => {
    if (isSpinning) {
      return;
    }
    const i = getNextSlot();
    const eachSlotAngle = 360 / gameState.players.length;
    const rotation = i * eachSlotAngle + 360 * randomInt(5, 10);
    setSpin(-rotation - randomAdjustment());
    setSpinning(true);
  };

  return (
    <Box>
      <Box>
        <Card sx={{ mt: 5 }} style={{ backgroundColor: spinResult.color }}>
          <CardContent>
            <Typography variant="h5">
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
          <Box style={{ width: 400 }}>
            <PieChart
              data={populatePi(gameState.players.length)}
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
