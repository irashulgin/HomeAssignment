import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import FavoriteScreen from "./screens/FavoriteScreen";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <Link to="/" id="homePage">Browse Beers</Link>
              <Link to="/favorite" id="favoritePage">Favorite Beers</Link>
            </header>
            <main>
              <Route path="/favorite" component={FavoriteScreen} />
              <Route path="/" component={HomeScreen} exact />
            </main>
            <footer></footer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
