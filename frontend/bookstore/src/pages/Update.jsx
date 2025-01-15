import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [file, setFile] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", book.title);
      formData.append("desc", book.desc);
      formData.append("price", book.price);
      if (file) {
        formData.append("cover", file);
      } else {
        formData.append("cover", book.cover); // Kirim cover lama jika tidak ada file baru
      }

      await axios.put(`http://localhost:8800/books/${bookId}`, formData);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Update Book</h1>
      <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="file"
        name="cover"
        onChange={handleFileChange}
      />
      <button onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;