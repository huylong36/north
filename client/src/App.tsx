import React from 'react';
import { Add } from './component/Add';
import { useAppSelector } from "../src/redux/slices/hook"
import { productState } from '../src/redux/slices/productSlice'
function App() {
  const appSelector = useAppSelector(productState);
  console.log('object ', appSelector);
  return (
    <div className="App">
      <Add />
    </div>
  );
}

export default App;
