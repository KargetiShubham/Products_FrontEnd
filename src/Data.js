const baseURL = "https://localhost:7096/";

export const fetchProducts = () => {
    let url = baseURL + "api/Items/Products";
    return fetch(url)
    .then((response) => {
        return response.json();
    })
  };
export const CreateProduct = ({name,description,price}) => {
    const URL = baseURL + "api/Items/Create";
    fetch(URL,{
        method : 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body : JSON.stringify({"name":name, "description" : description, "price" : price})
    })
}
export const EditProduct = ({id,name,description,price}) => {
    if(!id || id === 0 )return;
    const URL = baseURL + "api/Items/Edit?id=" + id;
    fetch(URL,{
        method : 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body : JSON.stringify({"id": id, "name":name, "description" : description, "price" : price})
    })
}
export const DeleteProduct = (id) => {
    const URL = baseURL + "api/Items/Delete?id=" + id;
    fetch(URL,{
        method : 'POST'
    }).then((response) => {
        console.log(response);
    })
}
export const GetProductDetail = (id) => {
    const URL = baseURL + "api/Items/GetProductDetail?id=" + id;
    const data = fetch(URL)
    .then((response)=>{
        return response.json();
    })
    return data;
}