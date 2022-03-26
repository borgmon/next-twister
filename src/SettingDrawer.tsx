import * as React from "react";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slider,
  TextField,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { SwipeableDrawer } from "@mui/material";
import { GameState } from "../pages";
import { Player } from "./Core";

export default function SettingDrawer({
  gameState,
  setGameState,
}: {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}) {
  const buildPlayers = (n: number) => {
    return Player.initNPlayers(n);
  };

  const onPlayersChange = (event: any) => {
    setGameState({
      ...gameState,
      players: buildPlayers(event.target.value),
    });
  };
  return (
    <Box sx={{ width: 320, padding: 2 }}>
      <List>
        <ListItem>
          <Typography variant="h4">Settings</Typography>
        </ListItem>

        <ListItem button key={"player-number"}>
          <Typography>Player Numbers</Typography>
        </ListItem>

        <ListItem>
          <Slider
            defaultValue={4}
            max={9}
            min={1}
            onChange={onPlayersChange}
            valueLabelDisplay="auto"
            marks
          />
        </ListItem>
      </List>
    </Box>
  );
}
