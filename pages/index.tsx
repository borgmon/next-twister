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
import { Button, SwipeableDrawer } from "@mui/material";

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
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Game gameState={state} />
        <Button onClick={toggleDrawer(true)}>Meow</Button>
        <Box
          role="presentation"
          // onClick={toggleDrawer(false)}
          // onKeyDown={toggleDrawer(false)}
        >
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
