import * as yup from 'yup'

export const formSchema = yup.object().shape({
  category: yup
    .string()
    .oneOf(['Daily', 'Weekly', 'Monthly', 'Yearly'], 'Please select a category')
    .label('Selected type')
})
