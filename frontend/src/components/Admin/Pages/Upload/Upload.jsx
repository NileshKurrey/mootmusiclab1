import React from 'react'
import './Upload.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Sidebar from '../../Ad-components/sidebar/Sidebar'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import SongUpload from '../../Ad-components/SongsUpload/songUpload';

import AdNavbar from '../../Ad-components/Navbar/AdNavbar';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const theme = createTheme({
        typography: {
            fontFamily: ['Poppins', 'sans-serif'].join(","),
        },
    });

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <ThemeProvider theme={theme}>

                    <Typography component="span">{children}</Typography>
                    </ThemeProvider>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function Upload() {
    const theme = createTheme({
        typography: {
            fontFamily: ['Poppins', 'sans-serif'].join(","),
        },
        palette: {
            secondary: {
                main: '#FFDE59',
            }
        }
    });
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
            <ThemeProvider theme={theme}>
                <Sidebar />
                <div style={{marginLeft:'30vh'}}>
                <AdNavbar/>
                <div className="Upload-wrapper">
                    <div className="UpoadTitle">
                        Upload Contents
                    </div>
                    <div className="Upload">


                        <Tabs
                            sx={{ fontWeight: 'bold' }}
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"
                        >
                            <Tab label="Upload Music" {...a11yProps(0)} />
                            <Tab label="Add Genre" {...a11yProps(1)} />
                            <Tab label="Create Album" {...a11yProps(2)} />
                        </Tabs>
                        <TabPanel value={value} index={0} className='tabPanel'>
            
                            <div className="UploadSong-wrapper">
                            <SongUpload />
                            </div>
 
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three
                        </TabPanel>
                    </div>
                </div>
                </div>
                
            </ThemeProvider>
        </>
    )
}

export default Upload