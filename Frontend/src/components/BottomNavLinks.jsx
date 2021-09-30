import React, { useContext, useRef, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SearchContext } from '../context/SongProvider';

import { Box } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';

function BottomNavLinks() {
  const { linkTagsValue, setLinkTagsValue } = useContext(SearchContext);
  const ref = useRef(null);
  const history = useHistory();
  const location = useLocation();

  // Run once on mount to set initial linkTagsValue for proper rendering in the nav
  useEffect(() => {
    if (location.pathname === '/') {
      setLinkTagsValue(0);
    } else if (location.pathname === '/searchResults') {
      setLinkTagsValue(1);
    }
  }, []);

  // Run every time linkTagsValue change and history changes
  // Why? - To update pages across the app with the proper link tag value
  useEffect(() => {
    // This is poorly optimized, it runs some of the selections several times / Joel
    // Change url based on click value from bottom nav
    if (linkTagsValue === 0 && location.pathname !== '/') {
      history.push('/');
    } else if (linkTagsValue === 1 && location.pathname !== '/searchResults') {
      history.push('/searchResults');
    }

    // Change the state value that handles the highlighting of the nav tags
    history.listen((location) => {
      if (location.pathname === '/') {
        setLinkTagsValue(0);
      } else if (location.pathname === '/searchResults') {
        setLinkTagsValue(1);
      } else {
        setLinkTagsValue(null)
      }
    });
  }, [linkTagsValue, history]);

  return (
    <Box sx={{ pb: 7, zIndex: 99 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={linkTagsValue}
          onChange={(_, newValue) => {
            console.log(newValue);
            setLinkTagsValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Search"
            icon={<SearchIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default BottomNavLinks;
