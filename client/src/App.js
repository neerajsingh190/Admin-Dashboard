// css baseline se different browser p same jaise dikh ske
// themprovider is same as provider in redux , ye wrap kr dega puri app ko us theme se
import { CssBaseline, ThemeProvider } from "@mui/material";
// createtheme se hum costomized theme bnate h , humne costomized theme already
// theme file m bna rkhi h so hum use krenge createthem fn m
import { createTheme } from "@mui/material/styles";
//import from theme file
import { themeSettings } from "theme";
import { useSelector } from 'react-redux';
import { useMemo } from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";

import Products from "scenes/Products/index";
import Customers from "scenes/customers";
import Transactions from "scenes/Transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";

function App() {
  // hum yha pr redux use krk props ko store k state s map krenge taki state chnage p prop change ho aur comp re-render ho jae
  const mode = useSelector((state) => state.global.mode);
  // hum chahte h k theme fn hr baar props update pr render hone s na chle ,
  // to kisi specific p hi chle so we use usememo  
  
  // ye mode update hoga tbhi jake themesetting wala fn chlega jo ki theme file m h costomized theme k liye
  const theme = useMemo(() =>
    createTheme(themeSettings(mode)),
    [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        {/* setting material ui for app*/}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
