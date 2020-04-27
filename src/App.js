import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";
function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home}></Route>
      <Route path="/chars/:id" component={Pokemon}></Route>
    </div>
  );
}

export default App;
