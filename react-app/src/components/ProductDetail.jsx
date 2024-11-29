import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function ProductDetail() {

    const [product, setproduct] = useState()
    const [user, setuser] = useState()
    console.log(user, user)
    const p = useParams()

    useEffect(() => {
        const url = 'http://localhost:4000/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setproduct(res.data.product)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])


    const handleContact = (addedBy) => {
        // console.log('id', addedBy)
        const url = 'http://localhost:4000/get-user/' + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setuser(res.data.user)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }
    const handleExchangeRequest = (productId) => {
        console.log('Requesting exchange for product ID:', product._id);
        // Add your logic for handling the exchange request here
    }

    return (<>
        <Header />
        PRODUCT DETAILS :
        <div >
            {product && <div className="d-flex justify-content-between flex-wrap">
                <div class>
                    <img width="400px" height="200px" src={'http://localhost:4000/' + product.pimage} alt="" />
                    {product.pimage2 && <img width="400px" height="200px" src={'http://localhost:4000/' + product.pimage} alt="" />}
                    <h6> Product Details : </h6>
                    {product.pdesc}
                </div>
                <div>
                    <h3 className="m-2 price-text"> Rs. {product.price} /- </h3>
                    <p className="m-2"> {product.pname}  | {product.category} </p>
                    <p className="m-2 text-success"> {product.pdesc} </p>

                    {product.addedBy &&
                        <button onClick={() => handleContact(product.addedBy)}>
                            SHOW CONTACT DETAILS
                        </button>}
                    {user && user.username && <h4>{user.username}</h4>}
                    {user && user.mobile && <h3>{user.mobile}</h3>}
                    {user && user.email && <h6>{user.email}</h6>}
                    <button onClick={() => handleExchangeRequest(product._Id)}>Swap</button>

                </div>
            </div>}
        </div>
    </>

    )
}

export default ProductDetail;