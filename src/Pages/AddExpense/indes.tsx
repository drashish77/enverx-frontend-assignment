import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddForm from '../../components/AddForm'

const AddExpense = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Container
        sx={{
          display: { xs: 'flex', md: 'flex' },
          justifyContent: 'space-between',
          mr: 1,
          my: 5
        }}
      >
        <button onClick={() => navigate(-1)}>Go back</button>
        <button onClick={() => navigate('/')}>Cancel</button>
      </Container>
      <div className=''>
        <AddForm />
      </div>
    </div>
  )
}

export default AddExpense
