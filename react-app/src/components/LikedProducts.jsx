import { useEffect } from "react";
import Header from "./Header";
import Categories from "./Categories.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import './Home.css';

function LikedProducts() {
    const navigate = useNavigate()

    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState(['']);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        const url = 'http://localhost:4000/liked-products';
        let data = {userId : localStorage.getItem('userId')}
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Something went wrong')
            })
    }, [])

    const handlesearch = (value) => {
        setsearch(value);
    }

    const handleClick = (value) => {
        let filteredProducts = products.filter((item) => {
            if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())) {
                // console.log(item);
                return item;
            }

        });
        setcproducts(filteredProducts)
    }

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
            if (item.category == value) {
                return item;
            }
            // console.log(value, "v");

        })
        setcproducts(filteredProducts)
    }

    const handleLike = (productId) => {
        if (!localStorage.getItem('token')){
            alert('Please login to like a product')
        }
        let userId = localStorage.getItem('userId')
        console.log('userId', "productId", productId, userId);

        const url = 'http://localhost:4000/like-product';
        const data = {userId, productId}
        axios.post(url, data)
            .then((res) => {
                if(res.data.message){
                    alert('Liked.')
                }
            })
            .catch((err) => {
                alert('Something went wrong')
            })
    }
        

    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

            <h5> SEARCH RESULTS </h5>

            <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3">
                                <div onClick={() => handleLike(item._id)} className="icon-con">
                                    <FaHeart className="icons" />
                                </div>
                                <img width="300px" height="200px" src={'http://localhost:4000/' + item.pimage} alt="Image-not-processed" />
                                <p className="m-2 ">{item.pname} | {item.category} </p>
                                <h3 className="m-2 text-success" > {item.price} </h3>
                                <p className="m-2 text-success" > {item.pdesc} </p>
                            </div>
                        )
                    })}
            </div>
 
            <h5>All Results</h5>

            <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 &&
                    products.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3">
                                <div onClick={() => handleLike(item._id)} className="icon-con">
                                    <FaHeart className="icons" />
                                </div>
                                <img width="300px" height="200px" src={'http://localhost:4000/' + item.pimage} alt="Image-not-processed" />
                                <p className="m-2 ">{item.pname} | {item.category} </p>
                                <h3 className="m-2 text-success" > {item.price} </h3>
                                <p className="m-2 text-success" > {item.pdesc} </p>
                            </div>
                        )
                    })}
            </div>

        </div>
    )
}

export default LikedProducts;