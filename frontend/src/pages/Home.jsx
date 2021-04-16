import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [data, setdata] = useState([]);
  const [addData, setaddData] = useState({
    name: "",
    year: "",
    price: 0,
    description: "",
  });
  const [editData, seteditData] = useState({
    name: "",
    year: "",
    price: 0,
    description: "",
    id: -1,
  });

  useEffect(() => {
    const fetchdata = async () => {
      const cars = await axios.get("http://localhost:5000/cars");
      console.log(cars.data);
      setdata(cars.data);
    };
    fetchdata();
  }, []);

  const renderData = () => {
    return data.map((val, index) => {
      if (val.id === editData.id) {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <input
                type="text"
                name="name"
                value={editData.name}
                className="form-control"
                onChange={OnEditInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="year"
                value={editData.year}
                className="form-control"
                onChange={OnEditInputChange}
              />
            </td>
            <td>
              <input
                type="number"
                name="price"
                value={editData.price}
                className="form-control"
                onChange={OnEditInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="description"
                value={editData.description}
                className="form-control"
                onChange={OnEditInputChange}
              />
            </td>
            <td>
              <button className="btn btn-danger mr-2" onClick={onEditYesClick}>
                Yes
              </button>
              <button
                className="btn btn-secondary ml-2"
                onClick={() => {
                  seteditData({
                    name: "",
                    year: "",
                    price: 0,
                    description: "",
                    id: -1,
                  });
                }}
              >
                No
              </button>
            </td>
          </tr>
        );
      }
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.name}</td>
          <td>{val.year}</td>
          <td>{val.price}</td>
          <td>{val.description}</td>
          <td>
            <button
              onClick={() => onDeleteClick(val.id)}
              className="btn btn-danger mr-2"
            >
              Delete
            </button>
            <button
              className="btn btn-secondary ml-2"
              onClick={() => onEditClick(index)}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };
  const onEditClick = (index) => {
    seteditData(data[index]);
  };
  const onEditYesClick = () => {
    let id = editData.id;
    let data = {
      name: editData.name,
      year: editData.year,
      price: editData.price,
      description: editData.description,
    };
    axios
      .put(`http://localhost:5000/cars/${id}`, data)
      .then((res) => {
        seteditData({
          name:"",
          year:"",
          price:"",
          description:"",
          id: -1,
        });
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDeleteClick = (id) => {
    var tanya = window.confirm("Delete data with id " + id + " ?");
    if (tanya) {
      axios
        .delete(`http://localhost:5000/cars/${id}`)
        .then((res) => {
          setdata(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const OnInputChange = (e) => {
    setaddData({ ...addData, [e.target.name]: e.target.value });
  };
  const OnEditInputChange = (e) => {
    console.log("coba");
    seteditData({ ...editData, [e.target.name]: e.target.value });
  };

  const onAddClick = () => {
    console.log(addData);

    // karena strukturenya sudah sama maka nggka perlu buat object baru lagi
    axios
      .post("http://localhost:5000/cars", addData)
      .then((res) => {
        console.log(res.data);
        setdata(res.data);
        setaddData({
        name:"",
        year:"",
        price:"",
        description:""
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-5 d-flex justify-content-center align-items-center">
      <div>
        <table>
          <thead>
            <th>No.</th>
            <th>Name</th>
            <th>Year</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </thead>
          <tbody>{renderData()}</tbody>
        </table>
        <input
          className="form-control my-2"
          placeholder="Name"
          type="text"
          name="name"
          value={addData.name}
          onChange={OnInputChange}
        />
        <input
          className="form-control my-2"
          placeholder="Year"
          type="text"
          name="year"
          value={addData.year}
          onChange={OnInputChange}
        />
        <input
          className="form-control my-2"
          placeholder="Price"
          type="number"
          name="price"
          value={addData.price}
          onChange={OnInputChange}
        />
        <input
          className="form-control my-2"
          placeholder="Description"
          type="text"
          name="description"
          value={addData.description}
          onChange={OnInputChange}
        />
        <button onClick={onAddClick} className="btn btn-success">
          ADD
        </button>
      </div>
    </div>
  );
}

export default Home;