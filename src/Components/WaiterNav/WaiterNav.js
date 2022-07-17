import './WaiterNav.css';
import bqlogo from '../../assets/bqlogo.png';
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom'
    
export default function WaiterNav() {
    const [placeOrdersState, setPlaceOrdersState] = useState('inactive');
    const [readyServeState, setReadyServeState] = useState('inactive');

    let location = useLocation().pathname;

    useEffect(() => {
        switch (location) {
            case '/waiter-view/place-orders':
                setPlaceOrdersState('active');
                setReadyServeState('inactive');
                break;
            case '/waiter-view/':
                setPlaceOrdersState('active');
                setReadyServeState('inactive');
                break;
            case '/waiter-view/ready-to-serve':
                setPlaceOrdersState('inactive');
                setReadyServeState('active');
                break;
            default:
                break;
        }
    }, [location])

    return (
        <header className='grid grid-flow-col fixed top-0 w-[100vw] bg-[#FAFAFA]'>
            <Link to='/navigate'>
                <img src={bqlogo} alt='Burger Queen' className='h-[13vh] p-2 ml-3' />
            </Link>
            <nav className='self-center mr-4 flex justify-evenly'>
                <button className={placeOrdersState}>
                    <Link to='/waiter-view/place-orders'>
                        Place orders
                    </Link>
                </button>
                <button className={readyServeState}>
                    <Link to='/waiter-view/ready-to-serve'>
                        See ready to serve
                    </Link>
                </button>
                <button className='font-medium bg-[#1B1A1A] hover:bg-[#FE9C08] text-white shadow-md rounded-2xl px-[6%] py-[1%]'>
                    Log out
                </button>
            </nav>
        </header>
    );
};
