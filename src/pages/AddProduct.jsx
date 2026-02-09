import {useState}  from 'react'
import { VerticalNavbar } from '../components/VerticalNavbar'
import Properties from '../forms/Properties'
import Stationaries from '../forms/Stationaries'


const AddProduct = () => {

    const [form, setForm] = useState("")

    return (
        <div className=' flex  '>
            <div className='fixed left-0 top-0 h-screen'>
                <VerticalNavbar />
            </div>

            <div className='bg-[#021d2d] ml-85 w-full min-h-screen '>
                
                <div className='  w-full h-30 pl-80 flex items-center gap-15'>
                 

                  
                    <button onClick={()=>setForm("stationary")} className='text-white  h-15 px-5 font-bold tracking-wider text-xl
                                     bg-blue-600/20 cursor-pointer opacity-80 border 
                                     border-b-blue-500 border-t-amber-300  rounded-xl border-x-emerald-400  '>Stationary Items</button>



                    <button onClick={()=>setForm("properties")} className='text-white  h-15 px-5 font-bold tracking-wider text-xl
                                     bg-blue-600/20 cursor-pointer opacity-80 border 
                                     border-b-blue-500 border-t-amber-300 border-yellow-700 rounded-xl '>Machineary Items</button>

                    <button onClick={()=>setForm("properties")} className='text-white  h-15 px-5 font-bold tracking-wider text-xl
                                     bg-blue-600/20 cursor-pointer opacity-80 border 
                                     border-b-blue-500 border-t-amber-300  rounded-xl border-x-emerald-400 '>Properties</button>
                
                </div>

                <div className=' w-full'>
                    {form === "stationary" && <Stationaries/>}
                    {form === "properties" && <Properties/>}
                </div>
                   
                   
                </div>
            </div>

    
    )
}

export default AddProduct