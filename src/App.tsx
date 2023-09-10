import type { Component } from "solid-js";
import { Router, Routes, Route } from "@solidjs/router";
import { ManageTracks } from "./ManageTracks";

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={() => <div>hello world</div>} />
        <Route path="/manage" component={ManageTracks} />
      </Routes>
    </Router>
  );
};

export default App;
