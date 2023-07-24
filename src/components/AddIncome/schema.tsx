import * as yup from 'yup'

export const formSchema = yup.object().shape({
  amount: yup.number().required('The amount number is required'),
  category: yup
    .string()
    .required('Please select a category')
    .oneOf(
      ['Salary', 'Freelancing', 'Contract', 'Others'],
      'Please select the income category'
    )
    .label('Selected type')
})
