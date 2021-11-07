import "./App.css";
import Ticker from "./components/Ticker";
import { Provider } from 'react-redux'
import configureStore from "./store";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Ticker />
     </Provider>
  );
}



export default App;
