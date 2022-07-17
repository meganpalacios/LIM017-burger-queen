import Icon from "../../IcoMoon/Icon";
import CartItems from "../CartItems/CartItems"
import { deleteAllProducts, sendOrderToFireBase } from "../../WaiterViewUtils";

export default function OrderInvoice(props) {
    return(
        <div className='bg-[#B5D6B2] shadow-md rounded-2xl h-[80vh] w-[28vw] mt-5 font-poppins font-normal flex flex-col fixed'>
            <div className='bg-[#FAFAFA] shadow-md rounded-2xl my-[2vh] mx-[1vw] px-[6%] py-[1%]'>
                Waiter: {props.username}
            </div>
            <div className='bg-[#FAFAFA] shadow-md rounded-2xl mx-[1vw] mb-[2vh] px-[6%] py-[1%]'>
                <label>Table:</label>
                <select name="select" className='bg-[#FAFAFA]'>
                    <option value="table1">1</option>
                    <option value="table2">2</option>
                    <option value="table3">3</option>
                    <option value="table4">4</option>
                    <option value="table5">5</option>
                </select>
            </div>
            <hr className='w-[90%] mx-[5%]' />
            <div className="max-h-[46vh] overflow-auto">
                <CartItems 
                    key={props.id}
                    selected={props.selected} 
                    setSelected={props.setSelected} 
                />
            </div>
            <div className="fixed bottom-0 mb-[35px]">
                <hr className='w-[90%] mx-[5%]' />
                <div className='bg-[#FFBF69] shadow-md rounded-2xl my-[2vh] mx-[1vw] px-[6%] py-[1%] grid grid-flow-col justify-between'>
                    <p>Total:</p>
                    <p>${props.total}</p>
                </div>
                <div>
                    <button onClick={()=> deleteAllProducts(props.selected, props.setSelected)}>
                        <Icon color="#1B1A1A" size={26} icon="bin" className='mx-[1.5vw]' />
                    </button>
                    <button onClick={()=> sendOrderToFireBase(props.selected, props.setSelected, props.username, props.total)} className='font-medium bg-[#1B1A1A] hover:bg-[#FE9C08] text-white shadow-md rounded-2xl px-[6%] py-[1%] w-[20vw] mr-3'>
                        Send order
                    </button>
                </div>
            </div>
        </div>
    );
}
