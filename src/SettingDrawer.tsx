import Typography from "@mui/material/Typography";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Slider,
} from "@mui/material";
import { GameSetting } from "../pages";
import { Player } from "./Core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SettingDrawer({
  gameSetting: gameSetting,
  setGameSetting: setGameSetting,
}: {
  gameSetting: GameSetting;
  setGameSetting: React.Dispatch<React.SetStateAction<GameSetting>>;
}) {
  const buildPlayers = (n: number) => {
    return Player.initNPlayers(n);
  };

  const onPlayersChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    setGameSetting({
      ...gameSetting,
      players: buildPlayers(value as number),
    });
  };

  const animationTimeHandler = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    setGameSetting({
      ...gameSetting,
      animationTime: value as number,
    });
  };

  const nsfwPossibilityHandler = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    setGameSetting({
      ...gameSetting,
      nsfwPossibility: value as number,
    });
  };

  const disableSamePlayerInARowHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setGameSetting({
      ...gameSetting,
      disableSamePlayerInARow: checked,
    });
  };

  const enableForcePlayerMoveNewColorHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setGameSetting({
      ...gameSetting,
      enableForcePlayerMoveNewColor: checked,
    });
  };

  const enablePrioritizeIdleLimbHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setGameSetting({
      ...gameSetting,
      enablePrioritizeIdleLimb: checked,
    });
  };

  const enableNSFWHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setGameSetting({
      ...gameSetting,
      enableNSFW: checked,
    });
  };

  return (
    <Box sx={{ width: 320, padding: 2 }}>
      <List>
        <ListItem>
          <Typography variant="h4">Settings</Typography>
        </ListItem>

        <ListItem>
          <Typography>Player numbers</Typography>
        </ListItem>
        <ListItem>
          <Slider
            value={gameSetting.players.length}
            max={9}
            min={2}
            onChange={onPlayersChange}
            valueLabelDisplay="auto"
            marks
          />
        </ListItem>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Advanced Settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gameSetting.disableSamePlayerInARow}
                        onChange={disableSamePlayerInARowHandler}
                      />
                    }
                    label="Disable same player in a row"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gameSetting.enableForcePlayerMoveNewColor}
                        onChange={enableForcePlayerMoveNewColorHandler}
                      />
                    }
                    label="Force players move to a new color"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gameSetting.enablePrioritizeIdleLimb}
                        onChange={enablePrioritizeIdleLimbHandler}
                      />
                    }
                    label="Prioritize unused hand/foot"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gameSetting.enableNSFW}
                        onChange={enableNSFWHandler}
                      />
                    }
                    label="Enable NSFW"
                  />
                </FormGroup>
              </ListItem>

              <ListItem>
                <Typography>NSFW Possibility</Typography>
              </ListItem>
              <ListItem>
                <Slider
                  value={gameSetting.nsfwPossibility}
                  max={10}
                  min={1}
                  onChange={nsfwPossibilityHandler}
                  valueLabelDisplay="auto"
                  marks
                />
              </ListItem>

              <ListItem>
                <Typography>Animation time</Typography>
              </ListItem>
              <ListItem>
                <Slider
                  value={gameSetting.animationTime}
                  max={10000}
                  min={1000}
                  onChange={animationTimeHandler}
                  valueLabelDisplay="auto"
                  step={1000}
                  marks
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </List>
    </Box>
  );
}
