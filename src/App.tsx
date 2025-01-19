import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routers';
import SpinnerInitial from './components/common/spinner/SpinnerInitial';

function App() {
  const elements = useRoutes(routes);
  return (
    <div className="App">
      <Suspense fallback={<SpinnerInitial />}>
        {elements}
      </Suspense>
    </div>
  );
}

export default App;