import { Switch, Route } from 'react-router-dom';

import PageLayout from './components/layout/pageLayout/pageLayout.component';
import PageContainer from './components/layout/pageContainer/pageContainer.component';

import Footer from './components/footer/footer.component';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShowPage from './pages/show/show.component';

import './App.scss';

function App() {
  return (
    <PageLayout>
      <Header />
      <PageContainer>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/show/:showId' component={ShowPage} />
        </Switch>
      </PageContainer>
      <Footer />
    </PageLayout>
  );
}

export default App;
