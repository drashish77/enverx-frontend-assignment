import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import './style.css'
import { Divider } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteExpense } from '../../redux/actions/expenses'
import {
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import db from '../../firebase'
import { toast } from 'react-hot-toast'
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

interface CardTypes {
  id?: string
  amount?: number
  title?: string
  description?: string
  time?: any
  category?: string
}
export default function ExpansesCard(item: CardTypes) {
  const { id, title, description, time, category, amount } = item
  const [expanded, setExpanded] = React.useState(false)
  const collectionRef = collection(db, 'expenses')
  // const handleExpandClick = (id: string) => setExpanded(!expanded)

  // const dispath = useDispatch()
  // const handleDelete = () => {
  // DELETE FUNCTION
  async function handleDelete() {
    try {
      const expenseRef = doc(collectionRef, id)
      await deleteDoc(expenseRef)
      toast.success('Expense card deleted successfully')
    } catch (error) {
      console.error(error)
    }
  }
  //   // dispath(deleteExpense(item))
  // }

  // EDIT FUNCTION
  // async function editSchool() {
  //   const updatedSchool = {
  //     score: id,
  //     lastUpdate: serverTimestamp()
  //   }

  //   try {
  //     const expenseRef = doc(collectionRef, id)
  //     updateDoc(expenseRef, updatedSchool)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <Card className='card'>
      <CardHeader
        sx={{ ':first-letter': 'uppercase' }}
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
        //     {title && title.toLowerCase()[0]}
        //   </Avatar>
        // }
        action={
          <IconButton
            aria-label='settings'
            sx={{ color: red[500] }}
            onClick={handleDelete}
          >
            <DeleteForeverIcon />
          </IconButton>
        }
        title={
          <Typography
            color='text.secondary'
            sx={{ padding: 0, fontWeight: 700 }}
          >
            {title}
          </Typography>
        }
        subheader={[
          <div>{time.toDate().toDateString()}</div>,
          time.toDate().toLocaleTimeString('en-US')
        ]}
      />

      <CardContent>
        <Typography variant='body2' color='text.secondary' sx={{ padding: 0 }}>
          <span className='card-span'>Amount:</span>
          {amount}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography color='text.secondary' sx={{ padding: 0 }}>
          <span className='card-span'>Category:</span>
          {category}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography paragraph>
          Description:
          <Divider sx={{ marginTop: 1 }} />
        </Typography>
        <Typography paragraph className='card-item'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}
