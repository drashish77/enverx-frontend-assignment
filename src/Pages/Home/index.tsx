import Header from '../../components/Header'
import AllExpenses from '../AllExpenses'
import Footer from '../../components/Footer'
import { useSelector } from 'react-redux'
const Home = () => {
  const data = useSelector((state) => state)
  console.log({ data })
  return (
    <div>
      {/* <Header /> */}
      <div className='container'>
        <AllExpenses />
      </div>
    </div>
  )
}

export default Home
