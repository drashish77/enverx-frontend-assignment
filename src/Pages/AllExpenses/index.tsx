import { useNavigate } from 'react-router-dom'
import './style.css'
import ExpansesCard from '../../components/Card'
import { useEffect, useState } from 'react'
import { onSnapshot } from 'firebase/firestore'
import { AllExpensesCollection, AllIncomeCollection } from '../../firebase'
import { AllExpensesType, AllIncomeType } from '../../../utils/types/expense'
import Grid from '@mui/material/Grid'
import { useDispatch, useSelector } from 'react-redux'
import { setExpense, setIncome } from '../../redux/actions/expenses'
import {
  Backdrop,
  CardContent,
  CircularProgress,
  Container,
  Typography
} from '@mui/material'
interface ListItemType {
  id: string
  title: string
  description: string
  category: string
  created_at: Date
  amount: number
}
const AllExpenses = () => {
  const [loading, setLoading] = useState(false)
  const [incomeLoader, setIncomeLoader] = useState(false)
  const [expenses, setExpensesLocal] = useState<AllExpensesType[]>([])
  const [incomeLocal, setIncomeLocal] = useState<AllIncomeType[]>([])
  const { expenseList } = useSelector((state: any) => state.expenses)
  const dispath = useDispatch()

  useEffect(() => {
    setLoading(true)
    const unsub = onSnapshot(AllExpensesCollection, (snapshot) => {
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
      setLoading(false)
    })
    return () => {
      unsub()
    }
  }, [])
  useEffect(() => {
    setIncomeLoader(true)
    const unsub = onSnapshot(AllIncomeCollection, (snapshot) => {
      dispath(
        setIncome(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          })
        )
      )
      setIncomeLocal(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
      )
      setIncomeLoader(false)
    })
    return () => {
      unsub()
    }
  }, [])

  const sumExpenses =
    expenses.length !== 0 &&
    expenses.reduce((accumulator, object: any) => {
      return accumulator + object.amount
    }, 0)
  const sumIncome =
    incomeLocal.length !== 0 &&
    incomeLocal.reduce((accumulator, object: any) => {
      return accumulator + object.amount
    }, 0)

  return (
    <div className=''>
      {loading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      ) : (
        <div className='container'>
          <Container id='balance'>
            <CardContent>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ padding: 0, marginBottom: 2 }}
              >
                {/* <AccountBalanceWalletIcon sx={{ marginTop: '50px' }} /> */}
                <span className='card-span'>Balance:</span>
                {+sumIncome - Number(sumExpenses)}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ padding: 0, marginBottom: 2 }}
              >
                <span className='card-span'>Total Income:</span>
                {sumIncome}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ padding: 0, marginBottom: 2 }}
              >
                <span className='card-span'>Total Expense:</span>
                {sumExpenses}
              </Typography>
            </CardContent>
          </Container>
          <div className='card-wrap'>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {expenses.length !== 0 ? (
                expenses.map(
                  ({
                    id,
                    title,
                    description,
                    created_at,
                    category,
                    amount
                  }) => {
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
      )}
    </div>
  )
}

export default AllExpenses
