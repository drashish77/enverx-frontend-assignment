import React from 'react'
import { useSelector } from 'react-redux'

const FilterByCategory = () => {
  const { expenseList } = useSelector((state: any) => state.expenses)

  return <div>FilterByCategory</div>
}

export default FilterByCategory
