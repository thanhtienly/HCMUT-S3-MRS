import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import signup from "../../assets/bku05.jpg";

const signupSchema = Yup.object().shape({
  mssv: Yup.string().length(7, "Mã số sinh viên phải có 7 ký tự"),
  username: Yup.string().required("Tên đăng nhập không được để trống"),
  firstname: Yup.string().required("Tên không được để trống"),
  lastname: Yup.string().required("Họ không được để trống"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  phone: Yup.string()
    .matches(/^\d+$/, "Số điện thoại chỉ chứa chữ số")
    .required("Số điện thoại không được để trống"),
  gender: Yup.string().required("Vui lòng chọn giới tính"),
  birthdate: Yup.date()
    .max(new Date(), "Ngày sinh không hợp lệ")
    .required("Vui lòng nhập ngày sinh"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
  reEnterPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
});

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    const payload = {
      userName: data.username,
      password: data.password,
      fullName: data.lastname,
      studentCode: data.mssv,
      name: data.firstname,
      dateOfBirth: data.birthdate,
      email: data.email,
      gender: data.gender,
      phoneNumber: data.phone,
      maTaiKhoan: "user",
    };

    fetch("http://localhost:8080/user/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("userdata", JSON.stringify(result));
        localStorage.setItem("isLogin", true);
        navigate("/menu");
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div
      className={"container_signup"}
      style={{
        backgroundImage: `url(${signup})`,
        backgroundSize: "cover",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container-fluid d-flex flex-column align-items-center">
          {/* <h2>Sign up</h2> */}
          <div className="inputContainer">
            <div className={"container_signup_register_form "}> ĐĂNG KÝ </div>
          </div>

          <div className="inputContainer">
            <input
              {...register("username")}
              placeholder="Tên đăng nhập"
              className="inputBox"
            />
            {errors.username && (
              <p className="errorFormValidator_css">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="inputContainer">
            <input
              {...register("firstname")}
              placeholder="Tên"
              className="inputBox"
            />
            {errors.firstname && (
              <p className="errorFormValidator_css">
                {errors.firstname.message}
              </p>
            )}
          </div>

          <div className="inputContainer">
            <input
              {...register("lastname")}
              placeholder="Họ"
              className="inputBox"
            />
            {errors.lastname && (
              <p className="errorFormValidator_css">
                {errors.lastname.message}
              </p>
            )}
          </div>
          <div className="inputContainer">
            <input
              {...register("mssv")}
              placeholder="Mã số sinh viên"
              className="inputBox"
            />
            {errors.mssv && (
              <p className="errorFormValidator_css">{errors.mssv.message}</p>
            )}
          </div>

          <div className="inputContainer">
            <input
              {...register("email")}
              placeholder="Email"
              className="inputBox"
            />
            {errors.email && (
              <p className="errorFormValidator_css">{errors.email.message}</p>
            )}
          </div>

          <div className="inputContainer">
            <input
              {...register("phone")}
              placeholder="Số điện thoại"
              className="inputBox"
            />
            {errors.phone && (
              <p className="errorFormValidator_css">{errors.phone.message}</p>
            )}
          </div>

          <div className="inputContainer">
            <select {...register("gender")} className="inputBox">
              <option value="">Chọn giới tính</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
            {errors.gender && (
              <p className="errorFormValidator_css">{errors.gender.message}</p>
            )}
          </div>

          <div className="inputContainer">
            <input
              {...register("birthdate")}
              type="date"
              className="inputBox"
            />
            {errors.birthdate && (
              <p className="errorFormValidator_css">
                {"Ngày sinh không hợp lệ"}
              </p>
            )}
          </div>

          <div className="inputContainer">
            <input
              {...register("password")}
              type="password"
              placeholder="Mật khẩu"
              className="inputBox"
            />
            {errors.password && (
              <p className="errorFormValidator_css">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="inputContainer">
            <input
              {...register("reEnterPassword")}
              type="password"
              placeholder="Xác nhận mật khẩu"
              className="inputBox"
            />
            {errors.reEnterPassword && (
              <p className="errorFormValidator_css">
                {errors.reEnterPassword.message}
              </p>
            )}
          </div>

          <button type="submit" className="buttonContainer">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
