import './styles.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { formSchema } from './schema'
import { redirect, Navigate, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import TitleIcon from '@mui/icons-material/Title'
import DescriptionIcon from '@mui/icons-material/Description'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import CategoryIcon from '@mui/icons-material/Category'
import { useDispatch } from 'react-redux'
import { addExpense } from '../../redux/actions/expenses'
import db from '../../firebase'
import { v4 as uuidv4 } from 'uuid'
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

interface FormValues {
  title: string
  description: string
  amount: number
  category: string
}
interface PayloadValues {
  id: string
  title: string
  description: string
  amount: number
  category: string
  created_at: Date
}

const FormComponent = () => {
  const navigate = useNavigate()
  const dispath = useDispatch()
  const collectionRef = collection(db, 'expenses')
  const [expenseList, setExpenseList] = useState([])
  const [loading, setLoading] = useState(false)

  const initialValues: FormValues = {
    title: '',
    description: '',
    amount: null || 0,
    category: ''
  }
  const onSubmit = async (
    values: FormValues,
    actions: { resetForm: () => void }
  ) => {
    const payload = {
      id: uuidv4(),
      title: values.title,
      description: values.description,
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
      // redirect('/all-expenses')
      navigate('/all-expenses', { replace: true })
    } catch (error) {
      console.error(error)
      toast.error('Form submission failed, please try again')
    }
  }
  //DELETE FUNCTION
  // async function deleteSchool(school) {
  //   try {
  //     const schoolRef = doc(colletionRef, school.id)
  //     await deleteDoc(schoolRef, schoolRef)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // // EDIT FUNCTION
  // async function editSchool(school) {
  //   const updatedSchool = {
  //     score: +score,
  //     lastUpdate: serverTimestamp()
  //   }

  //   try {
  //     const schoolRef = doc(colletionRef, school.id)
  //     updateDoc(schoolRef, updatedSchool)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  // ONE TIME GET FUNCTION

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
                {/* {JSON.stringify(props.errors)} */}
                <div className=''>
                  <div className='h-[90px]'>
                    <div className='title'>
                      <TitleIcon />
                      <Field
                        type='text'
                        name='title'
                        placeholder='Title'
                        className='title-input'
                      />
                    </div>
                    <div className='error-message '>
                      <ErrorMessage name='title' />
                    </div>
                  </div>
                  <div className='mb-5 grid h-[160px] grid-rows-2 gap-y-5 md:h-[90px] md:grid-cols-2 md:grid-rows-1 md:gap-2 lg:mb-0'>
                    <div className=''>
                      <div className='title'>
                        <DescriptionIcon />

                        <Field
                          component='textarea'
                          rows={5}
                          cols={40}
                          name='description'
                          placeholder='Description'
                          className='title-input'
                        />
                      </div>
                      <div className='error-message '>
                        <ErrorMessage name='description' />
                      </div>
                    </div>
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
                          Please select your expanse category
                        </option>
                        <option value='Daily'>Daily</option>
                        <option value='Weekly'>Weekly</option>
                        <option value='Monthly'>Monthly</option>
                        <option value='Yearly'>Yearly</option>
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
