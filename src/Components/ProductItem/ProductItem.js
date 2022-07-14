import Icon from "../../IcoMoon/Icon";
import { addProduct, subtractProduct } from '../../WaiterViewUtils.js'


export default function ProductItem(props) {
    return(
        <li className='bg-white shadow-md rounded-2xl text-center font-poppins font-light h-[95%]'>
            <img src={props.item.data.url} alt={props.item.data.Name} className='h-1/2 m-3 max-w-[80%] inline-grid' />
            <h4>{props.item.data.Name}</h4>
            <p>${props.item.data.Price}</p>
            <div className='flex justify-center my-[10px]'>
                <button onClick={()=>subtractProduct(props)} className='bg-[#B5D6B2] rounded-sm'>
                    <Icon color="#1B1A1A" size={8} icon="minus" className='mx-[6px]' />
                </button>
                <p className='mx-[8px]'>{props.item.data.Count}</p>

                <button onClick={()=>addProduct(props)} className='bg-[#B5D6B2] rounded-sm'>
                    <Icon color="#1B1A1A" size={8} icon="plus" className='mx-[6px]' />
                </button>
            </div>
        </li>
    )
}
