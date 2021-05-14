import { Switch, Route } from 'react-router-dom';

import Footer from './components/footer/footer.component';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShowPage from './pages/show/show.component';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/show/:showId' component={ShowPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
