import React, { useEffect, useMemo, useState } from 'react'
// import Item from './components/Item'
import './styles.css'
import { useSelector } from 'react-redux'
import { Backdrop, CircularProgress, Grid } from '@mui/material'
import ExpansesCard from '../Card'
import { AllExpensesType } from '../../../utils/types/expense'
import { onSnapshot } from 'firebase/firestore'
import { setExpense } from '../../redux/actions/expenses'
import { AllExpensesCollection } from '../../firebase'

//Filter list by category in React JS
export default function FilteredData() {
  const [loading, setLoading] = useState(false)
  const [incomeLoader, setIncomeLoader] = useState(false)
  const [expenses, setExpensesLocal] = useState<AllExpensesType[]>([])
  const { expenseList } = useSelector((state: any) => state.expenses)
  const [selectedCategory, setSelectedCategory] = useState('all')
  function getFilteredList() {
    if (selectedCategory === 'all') {
      return expenses
    }
    return expenses.filter((item: any) => item.category === selectedCategory)
  }
  const filteredList = getFilteredList()
  console.log({ expenseList })
  // Avoid duplicate function calls with useMemo
  // var filteredList = useMemo(getFilteredList, [selectedCategory, sportList])

  function handleCategoryChange(event: any) {
    setSelectedCategory(event.target.value)
  }
  useEffect(() => {
    setLoading(true)
    const unsub = onSnapshot(AllExpensesCollection, (snapshot) => {
      // dispath(
      //   setExpense(
      //     snapshot.docs.map((doc) => {
      //       return {
      //         id: doc.id,
      //         ...doc.data()
      //       }
      //     })
      //   )
      // )
      setExpensesLocal(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
      )
      setLoading(false)
    })
    return () => {
      unsub()
    }
  }, [])
  return (
    <div className='app'>
      <div className='filter-container'>
        <div>Filter by Category:</div>
        <div className='custom-select' style={{ width: '200px' }}>
          <select
            name='category-list'
            id='category-list'
            onChange={handleCategoryChange}
          >
            <option value=''>All</option>
            <option value='Daily'>Daily</option>
            <option value='Weekly'>Weekly</option>
            <option value='Monthly'>Monthly</option>
            <option value='Yearly'>Yearly</option>
          </select>
        </div>
      </div>
      {loading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
        <div className='card-wrap'>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {filteredList.length !== 0 ? (
              filteredList.map(
                ({ id, title, description, created_at, category, amount }) => {
                  return (
                    <Grid item xs={'auto'} sm={4} md={4} lg={3} key={id}>
                      <ExpansesCard
                        id={id}
                        title={title}
                        description={description}
                        category={category}
                        time={created_at}
                        amount={amount}
                      />
                    </Grid>
                  )
                }
              )
            ) : (
              <div>
                <p className=''>Please add some item</p>
              </div>
            )}
          </Grid>
        </div>
      )}
    </div>
  )
}
