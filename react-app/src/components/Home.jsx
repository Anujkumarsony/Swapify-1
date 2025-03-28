import { useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Categories from "./Categories.jsx";
import axios from "axios";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import './Home.css';

function Home() {
    const navigate = useNavigate()

    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState(['']);
    const [searching, setsearching] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login')
    //     }
    // }, [])

    useEffect(() => {
        const url = 'http://localhost:4000/get-products';
        axios.get(url)
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

    const handleClick = () => {

        const url = 'http://localhost:4000/search?search=' + search;
        axios.get(url)
        .then((res) => {
            setcproducts (res.data.products);
            // setproducts ([]);
            setsearching (true);
            console.log(res.data); 
        })
        .catch ((error) => {
            alert('An error occurred while liking the product. Please try again later.');
        })


        // let filteredProducts = products.filter((item) => {
        //     if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
        //         item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        //         item.category.toLowerCase().includes(search.toLowerCase())) {
        //         // console.log(item);
        //         return item;
        //     }

        // });
        // setcproducts(filteredProducts)
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
        let userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
        
        if (!userId) {
            alert('Please login to like a product');
            return; // Exit if user is not logged in
        }
        setIsLiked((prevLiked) => !prevLiked);
        const url = 'http://localhost:4000/like-product';
        const data = { userId, productId }; // userId is now the correct value
        // console.log(data);
        axios.post(url, data)
        .then((res) => {
            // console.log(res);
            if(res.data.message){
                alert('Product liked successfully');
            }
        })
        .catch ((error) => {
            console.error('Error liking product:', error);
            alert('An error occurred while liking the product. Please try again later.');
        })
    };

    const handleProduct = (id) => {

        navigate('/product/' + id)
    };

    const handleCardClick = (id, isLiked) => {
        if (isLiked) {
          handleProduct(id);
        }
      };

    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

            {/* <h5 style = {{display : searching ? "flex" : "none"}}> SEARCH RESULTS </h5> */}
            {searching && cproducts && 
                <h5> SEARCH RESULTS 
                    <button className="clear-btn" onClick={() => {
                        setsearching(false);
                        setsearch(['']);
                         }}> CLEAR </button>
                </h5>
            }
            {searching && cproducts && cproducts.length == 0 && <h5> NO RESULTS FOUND </h5>}
            {searching && <div className="d-flex justify-content-center flex-wrap">
                {cproducts && products.length > 0 &&
                    cproducts.map((item, index) => {
                        return (
                            <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
                                <div onClick={(e) => { e.stopPropagation(); handleLike(item._id); }} className="icon-con">
                                    <FaHeart className="icons" />
                                </div>
                                <img width="300px" height="200px" src={'http://localhost:4000/' + item.pimage} alt="Image-not-processed" />
                                <p className="m-2 ">{item.pname} | {item.category} </p>
                                <h3 className="m-2 text-success" > Rs.{item.price} </h3>
                                <p className="m-2 text-success" >  {item.pdesc} </p>
                            </div>
                        )
                    })}
            </div> }
 
            {!searching && <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 &&
                    products.map((item, index) => {
                        return (
                            <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
                                <div onClick={(e) => { e.stopPropagation(); handleLike(item._id); }} className="icon-con">
                                    <FaHeart
                                     className={`icons ${isLiked ? "liked" : ""}`} 
                                    />
                                </div>
                                <img width="300px" height="200px" src={'http://localhost:4000/' + item.pimage} alt="Image-not-processed" />
                                <p className="m-2 ">{item.pname} | {item.category} </p>
                                <h3 className="m-2 text-success" > Rs.{item.price} /- </h3>
                                <p className="m-2 text-success" > {item.pdesc} </p>
                            </div>
                        )
                    })}
            </div>}

        </div>
    )
}

export default Home;