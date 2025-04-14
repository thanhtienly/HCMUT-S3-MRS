import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Table, Tag, Modal, Button, Descriptions } from "antd";
// import CreateFeedbackForm from "../../components/CreateFeedbackForm/index";

const Profile = () => {
  const [complaints, setComplaints] = useState([]);
  const [userData, setUserData] = useState({});
  const [isDeleteComplaint, setIsDeleteComplaint] = useState(false);
  // const [orders, setOrders] = useState([]);
  // const [isReceived, setIsReceived] = useState(false);
  const [receiveData, setReceiveData] = useState(false);
  // const [maDonToFeedBack, setMaDonToFeedBack] = useState(null);
  const navigate = useNavigate();
  const [isAddFeedbackModalVisible, setIsAddFeedbackModalVisible] =
    useState(false);

  // Edit Modal
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  const showEditModal = () => {
    setEditFormData(userData); // Pre-fill form with current user data
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleEditFormSubmit = async () => {
    try {
      const url = `http://localhost:8080/user/update/${userData.idUser}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });
      if (response.ok) {
        // Since the response is plain text, use response.text()
        const message = await response.text();
        console.log(message); // Should log "update success"

        // Optionally, you might want to refresh the user data
        const userResponse = await fetch(
          `http://localhost:8080/user/${userData.idUser}`
        );
        const updatedUserData = await userResponse.json();
        setUserData(updatedUserData); // Update user data state
        setIsEditModalVisible(false); // Close modal
      } else {
        console.error("Error updating user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  // End Edit Modal

  const handleCloseAddFeedbackModal = () => {
    setIsAddFeedbackModalVisible(false);
  };
  // const handleAddFeedback = (id) => {
  //   setMaDonToFeedBack(id);
  //   console.log(id);
  //   console.log(localStorage.getItem("idUser"));
  //   // setIsAddFeedbackModalVisible(true);
  // };

  // tch((error) => console.error(error));
  // };

  useEffect(() => {
    const idUser = localStorage.getItem("idUser");
    if (idUser !== null) {
      const url = `http://localhost:8080/complaint/${idUser}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setComplaints(data));
    }
  }, [isDeleteComplaint]);

  // useEffect(() => {
  //   // Fetch users from API
  //   const url = "http://localhost:8080/donMonAn/all";
  //   fetch(url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setOrders(data);
  //       console.log(data);
  //     })
  //     //    .then(data => setUsers(data))
  //     .catch((error) => console.error("Error:", error));
  // }, [isReceived]);

  useEffect(() => {
    const idUser = localStorage.getItem("idUser");
    const url = `http://localhost:8080/user/${idUser}`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setReceiveData(true);
        console.log(idUser);
      })
      .catch((err) => console.log(err));
  }, [receiveData]);
  const handleDeleteComplaint = (idComplaint) => {
    const url = `http://localhost:8080/complaint/delete/${idComplaint}`;
    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json);
    setIsDeleteComplaint((prev) => !prev);
  };

  const columns = [
    {
      title: "Mã sinh viên",
      dataIndex: "idStudent",
      key: "idStudent",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text) => {
        const maxLength = 20; // Số ký tự tối đa bạn muốn hiển thị
        return text.length > maxLength
          ? text.substring(0, maxLength) + "..."
          : text;
      },
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (text) => {
        const maxLength = 40; // Số ký tự tối đa bạn muốn hiển thị
        return text.length > maxLength
          ? text.substring(0, maxLength) + "..."
          : text;
      },
    },
    {
      title: "Xóa lịch sử",
      dataIndex: "idComplaint", // Ensure `id` is the field containing the unique identifier
      key: "idComplaint",
      render: (idComplaint) => (
        <Tag color={"blue"} onClick={() => handleDeleteComplaint(idComplaint)}>
          Xóa
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <div className="container-feedback">
        <section style={{ backgroundColor: "#eee" }}>
          <div className="container py-5">
            <div className="d-flex justify-content-center">
              <div className="card" style={{ flex: "1", maxWidth: "33.33%" }}>
                <div className="card-body text-center align-items-center">
                  <div className="flex justify-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: "150px" }}
                    />
                  </div>
                  <h5 className="my-3">
                    {userData.fullName ? userData.fullName : "nah"}
                  </h5>
                  {/* <p className="text-muted mb-1">
                    {userData.is_staff
                      ? "Signed in as an ADMIN"
                      : "Signed in as a CUSTOMER"}
                  </p> */}
                  <p className="text-muted mb-4">{userData.email}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      onClick={showEditModal}
                      type="button"
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              <div className="card" style={{ flex: "1", maxWidth: "66.67%" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">User name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.userName}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Fullname</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.fullName}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone number</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Table
              className="w-full lg:w-3/5"
              columns={columns}
              dataSource={complaints}
            />
          </div>
        </section>
      </div>

      <Modal
        title="Add Product"
        visible={isAddFeedbackModalVisible}
        onCancel={handleCloseAddFeedbackModal}
        footer={null}
        width={800}
      ></Modal>

      <Modal
        title="Edit Profile"
        visible={isEditModalVisible}
        onCancel={closeEditModal}
        footer={[
          <Button key="back" onClick={closeEditModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleEditFormSubmit}>
            Save
          </Button>,
        ]}
      >
        {/* Form Fields */}
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={editFormData.name}
              onChange={(e) =>
                setEditFormData({ ...editFormData, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Full name</label>
            <input
              type="text"
              className="form-control"
              value={editFormData.fullName}
              onChange={(e) =>
                setEditFormData({ ...editFormData, fullName: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Birth Date</label>
            <input
              type="date"
              className="form-control"
              value={editFormData.dateOfBirth}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  dateOfBirth: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={editFormData.userName}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  userName: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={editFormData.email}
              onChange={(e) =>
                setEditFormData({ ...editFormData, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={editFormData.password}
              onChange={(e) =>
                setEditFormData({ ...editFormData, password: e.target.value })
              }
            />
            {editFormData.password && editFormData.password.length < 8 && (
              <small className="text-danger">
                Password must be greater than or equal 8 characters.
              </small>
            )}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={editFormData.confirmPassword}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  confirmPassword: e.target.value,
                })
              }
            />
            {editFormData.confirmPassword &&
              editFormData.confirmPassword !== editFormData.password && (
                <small className="text-danger">Passwords do not match.</small>
              )}
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              className="form-control"
              value={editFormData.gender}
              onChange={(e) =>
                setEditFormData({ ...editFormData, gender: e.target.value })
              }
            >
              <option value="">Select Sex</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            {editFormData.gender === "" && (
              <small className="text-danger">Please select your sex.</small>
            )}
          </div>
          {/* Include other fields as necessary */}
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
