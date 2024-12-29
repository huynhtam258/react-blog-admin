import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routers';

function App() {
  const elements = useRoutes(routes);
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        {elements}
      </Suspense>
    </div>
  );
}

export default App;