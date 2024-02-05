import { React, useState, useEffect } from "react";
import ItemPopup from "./ItemPopup";

import { DeleteProduct,GetProductDetail,fetchProducts } from "../Data";

const Layout = () => {
  const [products, setProducts] = useState([]);

  
  const [formData, setFormData] = useState({id: "",name: "",description: "",price: ""});
  const [ShowPopUp, SetShowPopUp] = useState(false);
  const [Header, setHeader] = useState("New Item");

  const ShowEditPopup = (id) => {
    SetShowPopUp(true);
    setHeader("Edit Item");
    //EditProduct({ id: id, name: "Shubham", description: "edit", price: 100 });
    GetProductDetail(id)
    .then((item) => {
      setFormData(item);
      console.log(item);
    })
  };

  const DeleteItem = (id) => {
    let confirm = window.confirm("Confirm deletion")
    if(confirm && confirm === true){
      DeleteProduct(id);
      alert("Product Deleted");
      fetchProducts()
      .then((data)=>{
        setProducts(data)
      })
    }
  };

  useEffect(() => {
    fetchProducts()
    .then((data)=>{
      setProducts(data)
    })
    
  }, []);

  return (
    <div>
      {ShowPopUp && (
        <ItemPopup
          formData={formData}
          setFormData = {setFormData}
          header={Header}
          SetShowPopUp={SetShowPopUp}
          setProducts = {setProducts}
        />
      )}
      <div
        className={`w-full h-full antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 ${
          ShowPopUp ? "opacity-20" : "opacity-100"
        }`}
      >
        <div className="flex flex-col justify-center items-start">
          <span className=" text-4xl font-bold font-serif text-white ml-10 mt-4">
            Products
          </span>
          <div className=" mt-10 ml-10 self-baseline">
            <button 
              className=" text-white text-2xl font-semibold pt-0 pl-2 pr-2 mb-2 rounded-md shadow-lg dark:bg-slate-600"
              onClick={() => {
                setHeader("New Item");
                SetShowPopUp(true);
                setFormData({id : "", name : "", description : "", price: "" })
              }}
            >
              New
            </button>
            {products.length > 0 ? (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg sm:mr-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Descritpion
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item) => (
                      <tr
                        key={item.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4 text-right">{item.id}</td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          {item.name}
                        </th>
                        <td className="px-6 py-4">{item.description}</td>
                        <td className="px-6 py-4">{item.price}</td>
                        <td className="px-6 py-4 text-right">
                          <a
                            href="#"
                            onClick={() => ShowEditPopup(item.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <a
                            href="#"
                            onClick={() => DeleteItem(item.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>No Data Available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
