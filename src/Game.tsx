import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Box, Button } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SettingDrawer from "./SettingDrawer";
import { GameState } from "../pages";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useSpring, animated, to, easings, useSpringRef } from "react-spring";
import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

const populatePi = (n: number) => {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push({ title: i.toString(), value: 1, color: COLORS[i] });
  }
  return result;
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
export default function Game({ gameState }: { gameState: GameState }) {
  const [spin, setSpin] = useState(0);
  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const randomAdjustment = () => {
    if (spin === 0) {
      return 0;
    }
    const eachSlotAngle = 360 / gameState.players;
    return randomInt(0, eachSlotAngle);
  };

  var anim = useSpring({
    from: {
      transform: `rotateZ(0deg)`,
    },
    to: {
      transform: `rotateZ(${-spin - randomAdjustment()}deg)`,
    },
    config: {
      duration: 5000,
      easing: easings.easeInOutExpo,
    },
    onRest: () => {},
  });

  const getNextSlot = () => {
    return randomInt(0, gameState.players - 1);
  };

  const onClickSpin = () => {
    const i = getNextSlot();
    const eachSlotAngle = 360 / gameState.players;
    const rotation = i * eachSlotAngle + 360 * randomInt(5, 10);
    setSpin(rotation);
  };

  return (
    <Box>
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
              data={populatePi(gameState.players)}
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
