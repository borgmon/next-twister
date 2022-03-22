import * as React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../src/Link";
import ProTip from "../src/ProTip";
import Copyright from "../src/Copyright";
import SettingDrawer from "../src/SettingDrawer";
import Game from "../src/Game";
import {
  AppBar,
  Button,
  IconButton,
  SpeedDial,
  SwipeableDrawer,
  Toolbar,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
export interface GameState {
  players: Number;
  isDrawerOpen: boolean;
}

const Home: NextPage = () => {
  const [state, setState] = React.useState<GameState>({
    players: 4,
    isDrawerOpen: false,
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
        <Game gameState={state} />
        <Box role="presentation">
          <SwipeableDrawer
            anchor={"left"}
            open={state.isDrawerOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <SettingDrawer gameState={state} setGameState={setState} />
          </SwipeableDrawer>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
