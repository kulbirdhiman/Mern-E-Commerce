import {useGetTopProductsQuery} from '../redux/api/productApiSlice'
import SmallProduct from '../pages/Products/SmallProduct'
import ProductCrousal from '../pages/Products/ProductCrousal'
const Header = () => {
  const data = useGetTopProductsQuery()
  
  console.log(data)
  return (
    <>
    <ProductCrousal />
    {/* <div className='flex justify-around'>
      <div className='xl:block lg:hidden md:hidden:sm:hidden'>
        <div className="grid grid-cols-2">
          {data.map((product)=>(
            <div key={product._id}>
                <SmallProduct product={product} />
              </div>
          ))}
        </div>
      </div>
    </div> */}
    </>
  )
}

export default Header