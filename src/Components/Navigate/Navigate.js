import './Navigate.css';
import { Link } from "react-router-dom";

function Navigate() {
    return(
        <div className="burgerBg h-screen grid place-content-center">
            <div className='flex gap-16 mt-[-50px]'>
                <Link data-testid="link-to-waiter-view" to='/waiter-view/place-orders'>
                    <button className='navBtn'>
                        <p className='text-2xl'>I'm a waiter or waitress</p>
                        <p>Place orders</p>
                    </button>
                </Link>
                <Link data-testid="link-to-chef-view" to='/chef-view'>
                    <button className='navBtn'>
                        <p className='text-2xl'>I'm a chef</p>
                        <p>See orders</p>
                    </button> 
                </Link>
            </div>
        </div>
    );
}

export default Navigate;
