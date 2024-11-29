import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import './Header.css'

function Header(props) {

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <div className='header-container d-flex justify-content-between'>

            <div>
                <Link className="links" to="/"> SWAPIFY </Link>
                <input className='search' type="text" value={props && props.search}
                    onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)
                    }
                />
                <button className='search-btn'
                    onClick={() => props.handleClick && props.handleClick()}
                > SEARCH </button>
            </div>

            <div>
                {!!localStorage.getItem('token') && 
                    <><Link to="/liked-products">
                        <button className="liked-btn"> <FaHeart className='hl-1'/>YOUR WISHLIST </button>
                    </Link><Link to="/add-product">
                            <button className="ap-btn"> ADD PRODUCT </button>
                        </Link></>}


                {!localStorage.getItem('token') ?
                    <Link to="/login"> <button className='loginButton'>LOGIN</button> </Link> :
                    <button className='logout-btn' onClick={handleLogout}> LOGOUT </button>}
            </div>

        </div>
    )
}

export default Header;