import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SettingDrawer from "../src/SettingDrawer";
import Wheel from "../src/Wheel";
import { SpeedDial, SwipeableDrawer } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Game, Player } from "../src/Core";
export interface GameSetting {
  players: Player[];
  game: Game;
  isDrawerOpen: boolean;
  disableSamePlayerInARow: boolean;
  enableForcePlayerMoveNewColor: boolean;
  enablePrioritizeIdleLimb: boolean;
  enableNSFW: boolean;
  animationTime: number;
}

const Home: NextPage = () => {
  const [state, setState] = React.useState<GameSetting>({
    players: Player.initNPlayers(4),
    game: new Game(4, 6),
    isDrawerOpen: false,
    disableSamePlayerInARow: true,
    enableForcePlayerMoveNewColor: true,
    enablePrioritizeIdleLimb: true,
    enableNSFW: false,
    animationTime: 5000,
  });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({
        ...state,
        isDrawerOpen: open,
      });
    };
  return (
    <Container maxWidth="lg">
      <SpeedDial
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SettingsIcon />}
        onClick={toggleDrawer(true)}
        ariaLabel={"Settings"}
      ></SpeedDial>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Next Twister</Typography>
        <Wheel gameSetting={state} setGameSetting={setState} />
        <Box role="presentation">
          <SwipeableDrawer
            anchor={"left"}
            open={state.isDrawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <SettingDrawer gameSetting={state} setGameSetting={setState} />
          </SwipeableDrawer>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
