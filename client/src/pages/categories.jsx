import React from 'react';
import CategoryList from '../components/CategoryListComponent';

const Categories = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Categories</h1>
            <CategoryList />
        </div>
    );
};

export default Categories;
