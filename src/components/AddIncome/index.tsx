import './styles.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { formSchema } from './schema'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import CategoryIcon from '@mui/icons-material/Category'
import { useDispatch } from 'react-redux'
import { addExpense } from '../../redux/actions/expenses'
import db from '../../firebase'
import { v4 as uuidv4 } from 'uuid'
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore'

interface FormValues {
  amount: number
  category: string
}

const FormComponent = () => {
  const navigate = useNavigate()
  const dispath = useDispatch()
  const collectionRef = collection(db, 'income')

  const initialValues: FormValues = {
    amount: null || 0,
    category: ''
  }
  const onSubmit = async (
    values: FormValues,
    actions: { resetForm: () => void }
  ) => {
    const payload = {
      id: uuidv4(),
      amount: values.amount,
      category: values.category,
      created_at: serverTimestamp()
    }

    try {
      const expanseRef = doc(collectionRef, payload.id)
      await setDoc(expanseRef, payload)
      dispath(addExpense(payload))
      actions.resetForm()
      toast.success('Form submitted successfully')
      navigate('/all-expenses', { replace: true })
    } catch (error) {
      console.error(error)
      toast.error('Form submission failed, please try again')
    }
  }

  return (
    <div className='form-wrapper'>
      <div className=''>
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={onSubmit}
        >
          {(props) => {
            const { errors, values, touched } = props
            return (
              <Form className=''>
                <div className=''>
                  <div className='mb-5 grid h-[160px] grid-rows-2 gap-y-5 md:h-[90px] md:grid-cols-2 md:grid-rows-1 md:gap-2 lg:mb-0'>
                    <div className=''>
                      <div className='title'>
                        <CurrencyRupeeIcon />
                        <Field
                          type='number'
                          name='amount'
                          placeholder='Amount'
                          pattern='^[0-9]*$'
                          className='title-input'
                        />
                      </div>
                      <div className='error-message'>
                        <ErrorMessage name='amount' />
                      </div>
                    </div>
                  </div>
                  <div className='h-[90px]'>
                    <div className='title '>
                      <CategoryIcon />
                      <Field
                        as='select'
                        name='category'
                        className='title-input'
                      >
                        <option value='' selected disabled hidden>
                          Please select your income category
                        </option>
                        <option value='Salary'>Salary</option>
                        <option value='Freelancing'>Freelancing</option>
                        <option value='Contract'>Contract</option>
                        <option value='Others'>Others</option>
                      </Field>
                    </div>
                    <div className='error-message '>
                      <ErrorMessage name='category' />
                    </div>
                  </div>
                </div>

                <div className=' relative mb-5 mt-8 lg:mt-8 '>
                  <button
                    type='submit'
                    disabled={props.isSubmitting}
                    className='submit-btn'
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default FormComponent
