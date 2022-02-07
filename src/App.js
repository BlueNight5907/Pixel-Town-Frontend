
import AppRouter from "./AppRouter";
import NotificationDialog from "./components/NotificationDialog";
import Loading from "./components/Loading";
import ThemeConfig from "./theme";
import ScrollToTop from "./components/Admin/ScrollToTop";
import React from "react";
function App() {
  return (
        <ThemeConfig>
            <ScrollToTop/>
            <NotificationDialog/>
            <Loading/>
            <AppRouter/>
        </ThemeConfig>
  );
}

export default App;
