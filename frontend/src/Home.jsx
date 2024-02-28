import {Link , useParams} from 'react-router-dom';
import {useAllProductsQuery} from './redux/api/productApiSlice'
import Header from './components/Header';
const Home = () => {
  const {keyword} = useParams()
  const {data, isLoading,isError ,error} = useAllProductsQuery({keyword})
  // console.log(data)
    if(isLoading){
      return "loading.."
    }
    if(error){
      return error
    }
  return (
   <>
   {!keyword ? <Header/>: null}
   </>
  )
}

export default Home