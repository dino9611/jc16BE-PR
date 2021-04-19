import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [data, setdata] = useState([]);
  const [adddata, setaddData] = useState({
    name: "",
    year: "",
    price: "",
    description: "",
  });
  const [editdata, seteditData] = useState({
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
      if (val.id === editdata.id) {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              <input
                name="name"
                type="text"
                value={editdata.name}
                onChange={OnEditInputChange}
                className="form-control"
              />
            </td>
            <td>
              <input
                name="year"
                type="text"
                value={editdata.year}
                onChange={OnEditInputChange}
                className="form-control"
              />
            </td>
            <td>
              <input
                name="price"
                type="number"
                value={editdata.price}
                onChange={OnEditInputChange}
                className="form-control"
              />
            </td>
            <td>
              <input
                name="description"
                type="text"
                value={editdata.description}
                onChange={OnEditInputChange}
                className="form-control"
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
              onClick={() => onEditClick(index)}
              className="btn btn-secondary ml-2"
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
    let id = editdata.id;
    // buat baru krn permintaan gabole ada id
    let data = {
      name: editdata.name,
      year: editdata.year,
      price: editdata.price,
      description: editdata.description,
    };
    axios
      .put(`http://localhost:5000/cars/${id}`, data)
      .then((res) => {
        seteditData({
          name: "",
          year: "",
          price: "",
          description: "",
          id: -1,
        });
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDeleteClick = (id) => {
    var tanya = window.confirm("you wanna delete data with id " + id + "?");
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
    setaddData({ ...adddata, [e.target.name]: e.target.value });
  };

  const OnEditInputChange = (e) => {
    seteditData({ ...editdata, [e.target.name]: e.target.value });
  };

  const onAddClick = () => {
    console.log(adddata);
    // krn struktur sudah sama dngn dipostman, maka tdk perlu buat obj baru lgi
    axios
      .post("http://localhost:5000/cars", adddata)
      .then((res) => {
        console.log(res.data);
        setdata(res.data);
        setaddData({
          name: "",
          year: "",
          price: "",
          description: "",
          id: -1,
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
          placeholder="Product Name"
          name="name"
          value={adddata.name}
          type="text"
          onChange={OnInputChange}
        />
        <input
          className="form-control my-2"
          placeholder="Year"
          name="year"
          value={adddata.year}
          type="text"
          onChange={OnInputChange}
        />
        <input
          className="form-control my-2"
          placeholder="Price"
          name="price"
          value={adddata.price}
          type="number"
          onChange={OnInputChange}
        />
        <input
          className="form-control my-2"
          placeholder="Description"
          name="description"
          value={adddata.description}
          type="text"
          onChange={OnInputChange}
        />
        <button onClick={onAddClick} className="btn btn-primary">
          add
        </button>
      </div>
    </div>
  );
}

export default Home;
