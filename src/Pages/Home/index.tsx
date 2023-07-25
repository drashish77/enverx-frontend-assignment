import FilteredData from '../../components/Table'
import { useSelector } from 'react-redux'
const Home = () => {
  return (
    <div>
      <div className='container'>
        <FilteredData />
      </div>
    </div>
  )
}

export default Home
