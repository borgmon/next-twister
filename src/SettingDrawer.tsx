import * as React from "react";
import Typography from "@mui/material/Typography";
import { Box, List, ListItem, Slider } from "@mui/material";
import { SwipeableDrawer } from "@mui/material";
import { GameSetting } from "../pages";
import { Player } from "./Core";

export default function SettingDrawer({
  gameSetting: gameState,
  setGameSetting: setGameSetting,
}: {
  gameSetting: GameSetting;
  setGameSetting: React.Dispatch<React.SetStateAction<GameSetting>>;
}) {
  const buildPlayers = (n: number) => {
    return Player.initNPlayers(n);
  };

  const onPlayersChange = (event: any) => {
    setGameSetting({
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
            defaultValue={gameState.players.length}
            max={9}
            min={2}
            onChange={onPlayersChange}
            valueLabelDisplay="auto"
            marks
          />
        </ListItem>
      </List>
    </Box>
  );
}
