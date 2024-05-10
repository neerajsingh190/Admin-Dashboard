import React, { useState } from 'react'
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from 'components/Sidebar';
// IMPORTING actions from rtk for api call
import { useGetUserQuery } from 'state/api';

const Layout = () => {
     const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    // humne userid ko redux s manga lia 
    const userId = useSelector((state) => state.global.userId);
    // ab userid ko hum api call me use kr lenge jo ki id milne p pura data de rha h id ka
    // so is tarike se humne mongodb ka data api bna k lya fir rtk use krk frontend s integrate kr dia 
    // fir action k through fum vo data frontend pr leke aa gye  , ab hum sidebar aur navbar m dal denge  
    const { data } = useGetUserQuery(userId);

    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
    <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
                <Navbar
                 user={data || {}}
                 isSidebarOpen={isSidebarOpen}
                 setIsSidebarOpen={setIsSidebarOpen} />
                {/* ye vo content display krega jo ki layout k niche routes h */}
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout
