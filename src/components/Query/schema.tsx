import * as yup from 'yup'

export const formSchema = yup.object().shape({
  title: yup.string().required('The title is required'),
  description: yup.string().required('The amount number is required'),
  amount: yup.number().required('The amount number is required'),
  category: yup
    .string()
    .required('Please select your requirements')
    .oneOf(
      ['Daily', 'Weekly', 'Monthly', 'Yearly'],
      'Please select the expanse category'
    )
    .label('Selected type')
})
