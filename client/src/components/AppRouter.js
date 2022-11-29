import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import {SHOP_ROUTE} from '../utils/consts'
import {Context} from '../index';

import { observer } from 'mobx-react-lite'

const AppRouter = observer(() => {
  const {user} = React.useContext(Context)
  return (
    <Routes>
      {user.isAuth && authRoutes.map(({path, Component})=>
        <Route key={path} path={path} element={<Component/>} exact></Route>
      )}
      {publicRoutes.map(({path, Component})=>
        <Route key={path} path={path} element={<Component/>} exact></Route>
      )}
      <Route path="*" element={<Navigate to = {SHOP_ROUTE} />}/>
    </Routes>
  );
});


export default AppRouter;