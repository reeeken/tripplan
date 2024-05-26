import Navbar from "./components/Navbar";
import {BrowserRouter as Router} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import './App.css'

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Navbar />
      </div>
    </ChakraProvider>
  );
}

export default App;
