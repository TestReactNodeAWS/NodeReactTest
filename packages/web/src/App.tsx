import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { FullPageLoading } from './components/FullPageLoading';
import { Layout } from './components/Layout';

// Pages are loaded on demand, so each one becomes its own file in the build.
const ItemsPage = lazy(async () => import('./pages/Items/ItemsPage'));

export const App: React.FC = () => (
  <Layout>
    <Suspense fallback={<FullPageLoading />}>
      <Switch>
        <Route exact path="/" component={ItemsPage} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  </Layout>
);
