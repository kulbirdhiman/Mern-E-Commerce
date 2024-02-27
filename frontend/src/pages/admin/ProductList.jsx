import { useNavigate } from "react-router"
import { useState } from "react"
import {useCreateProductMutation,useUploadProductImageMutation} from '../../redux/api/productApiSlice';
import {useFetchCategoriesQuery} from '../../redux/api/catagoryApiSlice'
import {toast} from 'react-toastify'
import AdminMenu from './AdminMenu'
const ProductList = ()=>{
    const[image,setImage] = useState("")
    const [name ,setName] = useState()
    const [discription ,setDiscription] = useState('')
    const [price , setPrice] = useState('');
    const [category ,setCategory] = useState('')
    const [quantity , setQuantity] = useState("")
    const [brand ,setBrand] = useState('')
    const [stock ,setStock ]= useState(0)
    const [imageUrl , setImageUrl] =useState(null)
    const navigate = useNavigate()
    const [createProduct ,{isLoading}] = useCreateProductMutation()
    const [uploadProductImage] = useUploadProductImageMutation()
    const {data :categories } = useFetchCategoriesQuery()

    const uploadFileHandler = async (e)=>{
        try {
            const formData = new FormData();
            formData.append("image", e.target.files[0])
          const res = await uploadProductImage(formData).unwrap();
          toast.success(res.message);
           setImage(res.image);
           setImageUrl(res.image);
        } catch (error) {
            toast.error(error.error)
        }
    }
    const submitHandler = async (e) =>{
        e.preventDefault();
        try {
            const formData = FormData();
            formData.append("image",image)
            formData.append("name",name)
            formData.append("brand",brand)
            formData.append("discription",discription),
            formData.append("price", price)
            formData.append("quantity",quantity)
            formData.append("stock",stock)
            const {data} = await createProduct(formData);
            if(data.error){
                toast.error("product not created")
            }else{
                toast.success("product is Created Successfully");
                navigate("/")
            }
        } catch (error) {
            toast.error("something worong/")
        }
    }

    return (
        <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={submitHandler}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}
export default ProductList