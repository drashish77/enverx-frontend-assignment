import { useNavigate } from 'react-router-dom'
import './style.css'
import ExpansesCard from '../../components/Card'
import { useEffect, useState } from 'react'
import { onSnapshot } from 'firebase/firestore'
import { AllExpensesCollection } from '../../firebase'
import { AllExpensesType } from '../../../utils/types/expense'

import Grid from '@mui/material/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { setExpense } from '../../redux/actions/expenses'
interface ListItemType {
  id: string
  title: string
  description: string
  category: string
  created_at: Date
  amount: number
}
const AllExpenses = () => {
  const [expenses, setExpensesLocal] = useState<AllExpensesType[]>([])
  const { expenseList } = useSelector((state: any) => state.expenses)
  // console.log('allExpenses', expenseList[0])
  const dispath = useDispatch()
  useEffect(
    () =>
      onSnapshot(AllExpensesCollection, (snapshot) => {
        dispath(
          setExpense(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data()
              }
            })
          )
        )
        setExpensesLocal(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          })
        )
      }),
    []
  )

  return (
    <div className='container'>
      <div className='card-wrap'>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {expenses.length !== 0 ? (
            expenses.map(
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
    </div>
  )
}

export default AllExpenses
