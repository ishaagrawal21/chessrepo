import axios from "axios";

class ApiHelper {
  constructor() {
    this.baseUrl = "http://localhost:5000";
  }

  getCategory() {
    return axios.get(`${this.baseUrl}/category`);
  }
  addCategory(category) {
    return axios.post(`${this.baseUrl}/category`, category);
  }
  updateCategory(category) {
    return axios.put(`${this.baseUrl}/category`, category);
  }
  deleteCategory(id) {
    return axios.delete(`${this.baseUrl}/category/${id}`);
  }

  getProduct() {
    return axios.get(`${this.baseUrl}/product`);
  }
  addProduct(product) {
    return axios.post(`${this.baseUrl}/product`, product);
  }
  deleteProduct(id){
    return axios.delete(`${this.baseUrl}/product/${id}`)
  }
  updateProduct(product){
    return axios.put(`${this.baseUrl}/product`,product)
  }

getBlogs(){
  return axios.get(`${this.baseUrl}/blog`)
}

}

const apihelper = new ApiHelper();
export default apihelper;
