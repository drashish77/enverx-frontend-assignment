import React from 'react';
import Header from './components/Header'

import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './redux/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddExpense from './Pages/AddExpense/indes'
import AllExpenses from './Pages/AllExpenses'
import RecentExpenses from './Pages/RecentExpenses'
import ErrorPage from './error'
import { Toaster } from 'react-hot-toast'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/add-expense',
    element: <AddExpense />
  },
  {
    path: '/recent-expenses',
    element: <RecentExpenses />
  },
  {
    path: '/all-expenses',
    element: <AllExpenses />
  }
])
root.render(
  <Provider store={store}>
    <Header />
    <Toaster position='top-right' />
    <RouterProvider router={router} />
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
