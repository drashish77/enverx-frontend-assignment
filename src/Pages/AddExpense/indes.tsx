import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import FormComponent from '../../components/Form'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import CancelIcon from '@mui/icons-material/Cancel'
const AddExpense = () => {
  const navigate = useNavigate()
  return (
    <Container className='container'>
      <Stack
        direction='row'
        spacing={2}
        sx={{
          display: { xs: 'flex', md: 'flex' },
          width: '100%',
          justifyContent: 'space-between',
          mr: 1,
          my: 5
        }}
      >
        <Button
          variant='outlined'
          onClick={() => navigate(-1)}
          startIcon={<KeyboardBackspaceIcon />}
        >
          Go back
        </Button>
        <Button
          variant='outlined'
          onClick={() => navigate('/')}
          endIcon={<CancelIcon />}
        >
          Cancel
        </Button>
      </Stack>
      <div className=''>
        <FormComponent />
      </div>
    </Container>
  )
}

export default AddExpense
