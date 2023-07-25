import { Container } from '@mui/material'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

const ErrorPage: React.FC = () => {
  const error = useRouteError()

  return (
    <Container maxWidth='xl' id='error-page'>
      <h1 className='text-4xl font-bold'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <div className='error-media'>
        <img src='/404.svg' alt='page not found' />
      </div>
      <p className='text-slate-400'>
        <i>
          {isRouteErrorResponse(error)
            ? error.error?.message || error.statusText
            : 'Unknown error message'}
        </i>
      </p>
    </Container>
  )
}

export default ErrorPage
