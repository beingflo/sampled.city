import type { Component } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";
import { ManageTracks } from "./manage-tracks/ManageTracks";
import { Hotkeys } from "./Hotkeys";
import { ViewTracks } from "./ViewTracks";
import { StoreProvider } from "./store";

const App: Component = () => {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Hotkeys />
          <Route path="/" component={ViewTracks} />
          <Route path="/manage" component={ManageTracks} />
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;
