import React from "react";
import "./App.css";
import PostRouting from "./pages/posts/posts.routing";
import HomeRouting from "./pages/home/home.routing";
import CategoriesRouting from './pages/categories/categories.routing';

const App = (props) => {
    return (
      <div className="container-fluid">
        
        <div className="row">&nbsp;</div>
          <HomeRouting />
          <PostRouting />
          <CategoriesRouting />
      </div>
    );
}

export default App;