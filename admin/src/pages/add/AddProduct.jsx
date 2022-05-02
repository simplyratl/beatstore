import React from 'react';
import AddForm from '../../components/add/AddForm';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './addproducts.scss';

const AddProduct = () => {
    return (
        <div className='add-products'>
            <Sidebar />

            <div className='add-container'>
                <Navbar />
                <AddForm />
            </div>
        </div>
    );
};

export default AddProduct;
