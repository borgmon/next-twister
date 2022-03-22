import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Box } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SettingDrawer from "./SettingDrawer";
import { GameState } from "../pages";

export default function Game({ gameState }: { gameState: GameState }) {
  return (
    <Box fontSize="500px">
      <CircleIcon fontSize="inherit"></CircleIcon>{" "}
      <Typography>{gameState.players}</Typography>
    </Box>
  );
}
