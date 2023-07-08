import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const IndexCircle = ({ progress = "0.75", size = "15", showText = true }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  const progressInPercent = Math.floor(progress * 100);
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[500]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${colors.greenAccent[500]}`,
        borderRadius: "50%",
        width: `${size}vw`,
        height: `${size}vw`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      {showText && 
            <Box>
              <Typography variant="h1" color="text.primary" fontSize = '3vw'>
                  {progressInPercent}
              </Typography>
              <Typography variant="h1" color="text.primary" fontSize = '1.5vw'>
                  points
              </Typography>
            </Box>
        }

    </Box>
  );
};

export default IndexCircle;
