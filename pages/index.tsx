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
import { animated, useSpring } from "react-spring";
export interface GameSetting {
  players: Player[];
  game: Game;
  isDrawerOpen: boolean;
  disableSamePlayerInARow: boolean;
  enableForcePlayerMoveNewColor: boolean;
  enablePrioritizeIdleLimb: boolean;
  enableNSFW: boolean;
  nsfwPossibility: number;
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
    nsfwPossibility: 1,
    animationTime: 5000,
  });
  const [flip, setFlip] = React.useState(false);

  var anim = useSpring({
    to: {
      textShadow:
        "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073",
    },
    from: {
      textShadow:
        "0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6",
    },
    reset: true,
    reverse: flip,
    delay: 200,
    onRest: () => setFlip(!flip),
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
        <animated.div style={anim}>
          <Typography variant="h3" style={{ fontFamily: "Josefin Sans" }}>
            Next Twister
          </Typography>
        </animated.div>
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
