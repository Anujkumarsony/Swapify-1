import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import categories from './CategoriesList';
import './Category.css';
import { useState } from 'react';

function Categories(props){

const navigate = useNavigate();
const [tab,selectedTab] = useState("all");

    return (
        <div className='cat-container'>
            <div>
            <span className='pr-3'>All Categories</span>
                { categories && categories.length > 0 &&
                    categories.map( (item, index) => {
                        return (
                        <span 
                        onClick={() => navigate('/category/' + item)}
                        key={index} className='category'> {item} </span>
                    )
                })}
            </div>

        </div>
    )
}

export default Categories;