import { useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './AddProduct.css';

function AddProduct() {

    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('Bikes');
    const [category1, setcategories] = useState('Bikes');
    const [pimage, setpimage] = useState('');
    const [pimage2, setpimage2] = useState('');
    const userKey = localStorage.getItem('userId');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    })

    const handleApi = () => {
        const formData = new FormData();
        formData.append('pname', pname)
        formData.append('pdesc', pdesc)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('category1', category1)
        formData.append('pimage', pimage);
        formData.append('pimage2', pimage2);
        formData.append('userId',localStorage.getItem('userId'))

        // Get the user ID from local storage
        // const userId = localStorage.getItem('userId');
        // if (userId) {
        //     formData.append('addedBy', userId); // Add user ID to form data
        // } else {
        //     alert("User  ID not found. Please log in.");
        //     return;
        // }

        const url = 'http://localhost:4000/add-product';
        axios.post(url, formData)
            .then((res) => {
                navigate('/');
                alert(res.data.message);
            })
            .catch((err) => {
                alert('server error');

            })

    }

    return (
        <div>
            <Header />
            <div className="p-3">
                <h2> ADD PRODUCT HERE : </h2>
                <label> Product Name </label>
                <input className="form-control" type="text" value={pname}
                    onChange={(e) => { setpname(e.target.value) }} />
                <label> Product Description </label>
                <input className="form-control" type="text" value={pdesc}
                    onChange={(e) => { setpdesc(e.target.value) }} />
                <label> Product Price </label>
                <input className="form-control" type="text" value={price}
                    onChange={(e) => { setprice(e.target.value) }} />
                <label> Product Category </label>
                <select className="form-control" value={category}
                    onChange={(e) => { setcategory(e.target.value) }} >
                    <option> Bikes </option>
                    <option> Mobile </option>
                    <option> Cloth </option>
                    <option> Laptop </option>
                    <option> Electronics </option>
                </select>
                <label> Product Image </label>
                <input className="form-control" type="file"
                    onChange={(e) => {
                        setpimage(e.target.files[0])
                    }} />
                <label> Product Second Image </label>
                <input className="form-control" type="file"
                    onChange={(e) => {
                        setpimage2(e.target.files[0])
                    }} />
                <label> Swap With Category</label>
                <select className="form-control" value={category1}
                    onChange={(e) => { setcategories(e.target.value) }} >
                    <option> Electronics </option>
                    <option> Furniture </option>
                    <option> Vehicles </option>
                    <option> Cloth </option>
                </select>    
                <button onClick={handleApi} className="btn btn-primary mt-3"> SUBMIT </button>
            </div>

        </div>
    )
}
export default AddProduct;