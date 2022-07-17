import { useState, useEffect } from 'react';
import OrderInvoice from '../OrderInvoice/OrderInvoice';
import Products from '../Products/Products';
import WaiterNav from '../WaiterNav/WaiterNav';
import './PlaceOrders.css';

export default function PlaceOrders(props) {
    const [ selected, setSelected ] = useState([]);
    const [ total, setTotal] = useState(0);
    
    useEffect(() => {
        const result = selected.reduce((acum , ele) => {
            return acum + ele.data.LocalTotal;

        }, 0)
        setTotal(result)
    },[selected]);

    return (
        <div className='bg-[#FAFAFA] h-screen'>
            <WaiterNav />
            <div className='container mt-[13vh]'>
                <main>
                    <Products
                    selected={selected} 
                    setSelected={setSelected}
                    />
                </main>
                <aside>
                    <OrderInvoice 
                    selected={selected} 
                    setSelected={setSelected}
                    username={props.username}
                    total={total}
                    setTotal={setTotal}
                    />
                </aside>
            </div>
        </div>
    );
}
