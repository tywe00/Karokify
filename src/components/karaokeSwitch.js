import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

const theme = createTheme({
    palette: {
      primary: {
        main: '#5D3FD3',  // This changes the primary color to red.
      },
      secondary: {
        main: '#212132',  // This changes the secondary color to green.
      },
    },
  });

function KaraokeSwitch(props) {
    const [state, setState] = React.useState({
        checkedA: false,
        //checkedB: true,
      });
    
      const handleChange = (event) => {
        //setState({ ...state, [event.target.name]: event.target.checked });
        props.onClick();
      };
    
      return (
        <div>
            <FormControlLabel
                label="Karaoke mode"
                sx={{color: 'white',}}
                control={
                <ThemeProvider theme={theme}>
                    <Switch
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        color="primary"
                        sx={{color: "red"}}
                        value="bhef"
                    />
                </ThemeProvider>
                
                }
                
            />
        </div>
      );
}
export default KaraokeSwitch;