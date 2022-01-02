
import AppRouter from "./AppRouter";
import NotificationDialog from "./components/NotificationDialog";
import Loading from "./components/Loading";
function App() {
  return (
        <div className="App">
          <AppRouter/>
          <NotificationDialog/>
          <Loading/>
        </div>
  );
}

export default App;
