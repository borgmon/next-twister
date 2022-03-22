import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Box } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SettingDrawer from "./SettingDrawer";
import { GameState } from "../pages";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useSpring, animated, to } from "react-spring";
import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
const rotation = 360;

const populatePi = (n: Number) => {
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
  const [flip, setFlip] = useState(false);
  const anim = useSpring({
    from: {
      transform: `rotateZ(0deg)`,
    },
    to: {
      transform: `rotateZ(${rotation}deg)`,
    },
    onRest: () => setFlip(!flip),
    delay: 200,
    reset: true,
    reverse: flip,
  });

  return (
    <Box>
      <Box fontSize="100px">
        <ArrowBackIosIcon
          fontSize="inherit"
          sx={{ transform: "rotate(270deg)", marginLeft: "38%" }}
        ></ArrowBackIosIcon>
      </Box>
      <animated.div style={anim}>
        <Box style={{ width: 400 }}>
          <PieChart
            data={populatePi(5)}
            label={({ dataEntry }) => dataEntry.title}
            startAngle={-90}
            animate
            // center={[50, 50]}
            labelStyle={{
              color: "white",
            }}
          />
        </Box>
      </animated.div>
    </Box>
  );
}
