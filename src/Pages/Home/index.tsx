import FilteredData from '../../components/Table'
import { useSelector } from 'react-redux'
const Home = () => {
  const data = useSelector((state) => state)
  console.log({ data })
  return (
    <div>
      <div className='container'>
        <FilteredData />
      </div>
    </div>
  )
}

export default Home
