import React, { useEffect } from 'react';
import { Add } from './component/Add';
import { useAppSelector } from "../src/redux/slices/hook"
import { productState } from '../src/redux/slices/productSlice'
import Cookies from 'js-cookie';
import { useAppDispatch } from './redux/slices/hook';
import { requestGetUserFromToken } from './redux/slices/authSlice';
function App() {
  const token = Cookies.get("token")
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      dispatch(requestGetUserFromToken())
    }
  }, []);
  const appSelector = useAppSelector(productState);
  console.log('object ', appSelector);
  return (
    <div className="App">
      <Add />
    </div>
  );
}

export default App;
