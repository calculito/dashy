import axios from "axios";

export default axios.create({
  baseURL: `https://dashybackend.herokuapp.com/`,
});
