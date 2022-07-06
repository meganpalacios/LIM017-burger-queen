import './WaiterView.css';
import bqlogo from '../../assets/bqlogo.png';
import Icon from "../../IcoMoon/Icon";
import { menuCollectionRef, getItemsById } from '../../firebase-utils';
import { getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { OrderInvoice } from './OrderInvoice'




const addProductQty = (props,id) => {
    console.log(props,id);
    getItemsById(id).then((orderedItems) => {
        console.log(orderedItems);
        const foundItem = props.props.productSelected.find((item) =>item.id === id);
        console.log(foundItem);
        if (foundItem === undefined) {
            orderedItems.data.Count =0;
            props.props.setProductSelected([...props.props.productSelected, {...orderedItems}]);
            props.props.setCounter(orderedItems.data.Count);
        } else {
            let addToCount = props.productSelected[0];
            addToCount.data.Count = addToCount.data.Count + 1;
            props.props.setProductSelected([...props.props.productSelected]);
            props.props.setCounter(addToCount.data.Count);
        }
    })
    .catch((err) => {console.log(err.message)});
}
const subtracProductQty = (props,id) => {
    getItemsById(id).then((orderedItems) => {
        const foundItem = props.productSelected.find((item) =>item.id === id);
        if (foundItem === undefined) {
            orderedItems.data.Count =  0;
            props.props.setProductSelected([...props.props.productSelected, {...orderedItems}]);
            props.setCounter(orderedItems.data.Count);
        } else {
            let addToCount = props.props.productSelected[0];
            addToCount.data.Count --;
            if (addToCount.data.Count < 0) addToCount.data.Count = 0;
            props.props.setProductSelected([...props.props.productSelected]);
            props.props.setCounter(addToCount.data.Count);
        }
    })
    .catch((err) => {console.log(err.message)});
}

function ChangeProductQty (props) {

    return (
        <>
            <ProductItem counter ={props.counter++} addProductQty={[props,props.item.id]} subtracProductQty={[props,props.item.id]} />
        </>
    );
}


function ProductItem(props) {

    return(
        <li className='bg-white shadow-md rounded-2xl text-center font-poppins font-light h-[95%]'>
            <img src={props.item.data.url} alt={props.item.data.Name} className='h-1/2 m-3 max-w-[80%] inline-grid' />
            <h4>{props.item.data.Name}</h4>
            <p>${props.item.data.Price}</p>
            <div className='flex justify-center my-[10px]'>
                <button onClick={()=>subtracProductQty(props,props.item.id)} className='bg-[#B5D6B2] rounded-sm'>
                    <Icon color="#1B1A1A" size={8} icon="minus" className='mx-[6px]' />
                </button>
                <p className='mx-[8px]'>{props.counter}</p>
                <button onClick={()=>addProductQty(props,props.item.id)} className='bg-[#B5D6B2] rounded-sm'>
                    <Icon color="#1B1A1A" size={8} icon="plus" className='mx-[6px]' />
                </button>
            </div>
        </li>
    )
}


function Products(props) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    useEffect(() => {
        getMenuItems()
    }, [loading])

    function getMenuItems() {
        getDocs(menuCollectionRef)
        .then(response => {
            const menuItems = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id
            }))
            setItems(menuItems);
            setLoading(false);
        }).catch(error => console.log(error))
    }

    if (loading) {
        return <div className='font-poppins font-light ml-6'>Loading menu...</div>;
    }
    return (
        <div className='menu grid grid-cols-4 gap-5 m-5'>
            <ul className='contents'>
                {items.map(item => <ProductItem key={item.id} item={item} props={props}/>)}
            </ul>
        </div>
    );
}

function WaiterView() {
    const [ productSelected, setProductSelected ] = useState([]);
    const [ counter, setCounter] = useState(0);
    // console.log('consoleando en id', id)
    return (
        <div className='bg-[#FAFAFA] WaiterView'>
            <main className='main'>
                <img src={bqlogo} alt='Burger Queen' className='h-24 ml-4 mt-3' />
                <Products
                productSelected={productSelected} 
                setProductSelected={setProductSelected}
                counter={counter}
                setCounter={setCounter} 
                />
            </main>
            <aside className='aside'>
                <OrderInvoice 
                productSelected={productSelected} 
                setProductSelected={setProductSelected}
                counter={counter}
                setCounter={setCounter}
                />
            </aside>
        </div>
    );
}

/*function Order(props) {
    return(
        <div className='bg-[#B5D6B2] shadow-md rounded-2xl h-[93vh] mt-5 font-poppins font-normal fixed w-[28vw]'>
            <div className='bg-[#FAFAFA] shadow-md rounded-2xl my-[2vh] mx-[1vw] px-[6%] py-[1%]'>
                Waiter: {waiter}
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
            <div>Ordered items go here</div>
            <div className='ordersContainer'>
                <div>
                    <p>{props.data.quantity}</p>
                    <p>{props.data.name}</p>
                    <Icon color="#1B1A1A" size={26} icon="bin" className='mx-[1.8vw]'/>
                </div>
                <div>
                    <p>{props.data.price}</p>
                </div> 
            </div>
            <hr className='w-[90%] mx-[5%]' />
            <div className='bg-[#FFBF69] shadow-md rounded-2xl my-[2vh] mx-[1vw] px-[6%] py-[1%] grid grid-flow-col justify-between'>
                <p>Total:</p>
                <p>{total}</p>
            </div>
            <div>
                <Icon color="#1B1A1A" size={26} icon="bin" className='mx-[1.8vw]' />
                <button className='font-medium bg-[#1B1A1A] text-white shadow-md rounded-2xl px-[6%] py-[1%] w-[20vw]'>
                    Send order
                </button>
            </div>
        </div>
    );
}*/



export { WaiterView, Products, ChangeProductQty, ProductItem};