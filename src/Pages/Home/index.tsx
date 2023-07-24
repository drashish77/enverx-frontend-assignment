import FilteredData from '../../components/Table'
import AllExpenses from '../AllExpenses'
import { useSelector } from 'react-redux'
const Home = () => {
  const data = useSelector((state) => state)
  console.log({ data })
  return (
    <div>
      {/* <Header /> */}
      <div className='container'>
        {/* <AllExpenses /> */}
        <FilteredData />
      </div>
    </div>
  )
}

export default Home
