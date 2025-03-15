import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

// Schema validation với Yup
const signupSchema = Yup.object().shape({
  cccd: Yup.string()
    .length(9, "Căn cước công dân phải có 9 ký tự")
    .required("Vui lòng nhập căn cước công dân"),
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
      tenDangNhap: data.username,
      matKhau: data.password,
      ho: data.lastname,
      ten: data.firstname,
      ngaySinh: data.birthdate,
      email: data.email,
      gioiTinh: data.gender,
      soDienThoai: [data.phone],
      maTaiKhoan: "user",
      cccdQuanTriVien: {
        cccd: "999999999",
      },
      anhThongTin: "https://www.vecteezy.com/free-vector/user-profile",
      listThongBao: null,
    };

    fetch("http://localhost:8080/thongTin/create", {
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
    <div className={"container_signup"}>
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

// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// // import { useNavigate } from 'react-router-dom'
// import "./styles.scss";
// import { signupSchema } from "../../Validate/validator";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

// const Signup = (props) => {
//   const [CCCD, setCCCD] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [reEnterPassword, setReEnterPassword] = useState("");
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   // const [phoneList, setPhoneList] = useState([]);
//   const [gender, setGender] = useState("");
//   const [birthdate, setBirthdate] = useState(
//     new Date().toISOString().split("T")[0]
//   );

//   // validate

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(signupSchema), // Tích hợp Yup
//   });
//   const [checkEmail, setCheckEmail] = useState(true);

//   const current = new Date().toISOString().split("T")[0];

//   const emailElement = useRef();
//   const errorEmailElement = useRef();

//   const cccdElement = useRef();
//   const errorCcccdElement = useRef();

//   const nameElement = useRef();
//   const errorNameElement = useRef();

//   const fullNameElement = useRef();
//   const errorFullNameElement = useRef();

//   const phoneNumberElement = useRef();
//   const errorPhoneNumberElement = useRef();

//   const loginNameElement = useRef();
//   const errorloginNameElement = useRef();

//   // const navigate = useNavigate()
//   let dataListUser = [];
//   useEffect(() => {
//     fetch("http://localhost:8080/thongTin/all", {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())
//       .then((datas) => {
//         console.log(datas);
//         let dataUsers = datas.map((data) => data.tenDangNhap);
//         dataListUser = dataUsers;
//       });
//   }, []);
//   console.log("LIST USERNAME");
//   console.log(dataListUser);

//   const navigate = useNavigate();

//   const handleSignup = () => {
//     console.log("CHECK");
//     // You'll update this function later...
//     const url = "http://localhost:8080/thongTin/create";
//     let handlerListPhone = [phone];

//     const payload = {
//       cccd: CCCD,
//       tenDangNhap: username,
//       matKhau: password,
//       ho: lastname,
//       ten: firstname,
//       ngaySinh: birthdate,
//       email: email,
//       gioiTinh: gender,
//       soDienThoai: handlerListPhone,
//       maTaiKhoan: "",
//       cccdQuanTriVien: "",
//       anhThongTin: "https://www.vecteezy.com/free-vector/user-profile",
//     };
//     console.log(payload);
//     fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         localStorage.setItem("userdata", JSON.stringify(data));
//         localStorage.setItem("isLogin", true);
//         navigate("/menu");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const functionCheckEmail = (valueText) => {
//     var keyCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     //    var textValue = document.querySelector(idInput);
//     return keyCheck.test(valueText) ? true : false;
//   };
//   const [checkEmail01, setCheckEmail01] = useState(true);
//   const [checkEmail02, setCheckEmail02] = useState(true);
//   const handlerEmail = (value) => {
//     if (value == "") {
//       setCheckEmail01(false);
//       console.log("CHECK VALUE");
//       console.log(value);
//       emailElement.current.style.cssText = `
//       border-color: red;

//     `;
//       errorEmailElement.current.style.cssText = `
//        display:block;

//   `;
//     } else {
//       setCheckEmail01(true);
//       emailElement.current.style.cssText = `
//       border-color: grey;

//     `;
//       errorEmailElement.current.style.cssText = `
//        display:none;

//   `;
//     }
//     // let newEmail = ;
//     // setEmail(res.target.value);
//     let newCheckEmail = functionCheckEmail(value);
//     // setCheckEmail(newCheckEmail);
//     if (newCheckEmail) {
//       setCheckEmail02(false);
//       emailElement.current.style.cssText = `
//       border-color: grey;

//     `;
//       errorEmailElement.current.style.cssText = `
//     display:none;

// `;
//     } else {
//       setCheckEmail02(true);
//       emailElement.current.style.cssText = `
//       border-color: red;

//     `;
//       errorEmailElement.current.style.cssText = `
//        display:block;

//   `;
//     }
//   };
//   const functionCheckCccd = (value) => {
//     //  console.log(value)
//     return value.length === 9;
//   };
//   const handlerCccd = (data) => {
//     if (functionCheckCccd(data)) {
//       cccdElement.current.style.cssText = `
//       border-color: grey;

//     `;
//       errorCcccdElement.current.style.cssText = `
//     display:none; `;
//     } else {
//       cccdElement.current.style.cssText = `
//       border-color: red;

//     `;
//       errorCcccdElement.current.style.cssText = `
//        display:block;

//   `;
//     }
//   };
//   const [checkFullName, setCheckFullName] = useState(true);
//   const checkValueOnHandlerOnBlurEvent = (value) => value != "";
//   const handlerOnBlurInput = (ev) => {
//     let newCheckFullNameArg = checkValueOnHandlerOnBlurEvent(ev.target.value);
//     setCheckFullName(newCheckFullNameArg);
//     if (newCheckFullNameArg && checkFullName) {
//       fullNameElement.current.style.cssText = `
//           border-color: grey;

//         `;
//       errorFullNameElement.current.style.cssText = `
//         display:none;

//     `;
//     } else {
//       fullNameElement.current.style.cssText = `
//           border-color: red;

//         `;
//       errorFullNameElement.current.style.cssText = `
//            display:block;

//       `;
//     }
//   };
//   // const handlerInputNotAllowEmpty = (value, inputElement, errorElement) => {
//   //   if (value === "") {
//   //     inputElement.current.style.cssText = `
//   //     border-color: grey;`;
//   //     errorElement.current.style.cssText = `
//   //       display:none;

//   //   `;
//   //   } else {
//   //     inputElement.current.style.cssText = `
//   //     border-color: red;`;
//   //     errorElement.current.style.cssText = `
//   //       display:block;

//   //   `;
//   //   }
//   // };
//   const onSubmit = (data) => {
//     console.log("Form Data:", data);
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div
//           className={"container-fluid d-flex flex-column align-items-center"}
//         >
//           <div className={"titleContainer"}>
//             <div>Sign up</div>
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               ref={cccdElement}
//               value={CCCD}
//               placeholder="Căn cước công dân"
//               onChange={(ev) => setCCCD(ev.target.value)}
//               onBlur={(res) => handlerCccd(res.target.value)}
//               className={"inputBox"}
//               type="text"
//               required
//             />
//             <div className={"error_element_css_style"} ref={errorCcccdElement}>
//               Vui lòng nhập đúng căn cước
//             </div>
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               value={username}
//               placeholder="Tên đăng nhập"
//               onChange={(ev) => setUsername(ev.target.value)}
//               className={"inputBox"}
//               type="text"
//               required
//             />
//           </div>
//           {/* <div className={"error_element_css_style"} ref={errorCcccdElement}>
//             Vui lòng nhập đúng căn cước
//           </div> */}
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               // value={firstname}
//               // placeholder="Tên (*Anh)"
//               // onChange={(ev) => setFirstname(ev.target.value)}
//               // onBlur={(res) => handlerInputNotAllowEmpty(res.target.value)}
//               className={"inputBox"}
//               type="text"
//               // required
//               {...register("name")}
//             />
//           </div>
//           {errors.name && (
//             <p className={"error_element_css_style"}>{errors.name.message}</p>
//           )}
//           {/* <div className={"error_element_css_style"} ref={errorCcccdElement}>
//             Vui lòng không bỏ trống tên
//           </div> */}
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               ref={fullNameElement}
//               value={lastname}
//               placeholder="Họ và tên đệm (*Nguyễn Văn)"
//               onChange={(ev) => setLastname(ev.target.value)}
//               className={"inputBox"}
//               type="text"
//               required
//             />
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <select
//               value={gender}
//               onChange={(ev) => setGender(ev.target.value)}
//               className="inputBox"
//               required
//             >
//               <option value="M">Male</option>
//               <option value="F">Female</option>
//               <option value="O">Other</option>
//             </select>
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               value={phone}
//               placeholder="Số điện thoại"
//               onChange={(ev) => {
//                 setPhone(ev.target.value);
//                 // setPhoneList((prev) => {

//                 //   return [...prev, ];
//                 // })
//               }}
//               className={"inputBox"}
//               data-validate="{required:true, 'validate-number':true, 'validate-phoneLax': true}"
//               type="text"
//               required
//             />
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               ref={emailElement}
//               id={"password"}
//               value={email}
//               placeholder="Địa chỉ email"
//               onChange={(res) => setEmail(res.target.value)}
//               onBlur={(ev) => handlerEmail(ev.target.value)}
//               className={"inputBox"}
//               type="email"
//               required
//             />
//             <div className={"error_element_css_style"} ref={errorEmailElement}>
//               {checkEmail01
//                 ? checkEmail02
//                   ? ""
//                   : "Vui lòng nhập đúng định dạng gmail"
//                 : "Không được bỏ trống email"}
//             </div>
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               type="date"
//               placeholder="Enter BirthDate"
//               value={birthdate}
//               onChange={(ev) => setBirthdate(ev.target.value)}
//               name="birthdate"
//               max={current}
//             />
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               value={password}
//               placeholder="Mật khẩu"
//               onChange={(ev) => setPassword(ev.target.value)}
//               className={"inputBox"}
//               type="password"
//               required
//             />
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               value={reEnterPassword}
//               placeholder="Xác nhận mật khẩu"
//               onChange={(ev) => setReEnterPassword(ev.target.value)}
//               className={"inputBox"}
//               type="password"
//               required
//             />
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <button className={"buttonContainer"} onClick={handleSignup}>
//               Sign up
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );

// CODE MỚI

// return (
//   <>
//     <div className="mainContainer_alert"></div>
//     <div className="bodyElement">
//       <form id="container__form-1">
//         <div id="form-1" className="container">
//           <div className="container__element --title">
//             <div className="container__element_infoChild --firstChild">
//               Thành viên đăng ký
//             </div>
//             <div className="container__element_infoChild --secondChild">
//               Cùng nhau học lập trình miễn phí tại F8
//             </div>
//           </div>
//           <div className="container__element --inputBox">
//             <label htmlFor="fullName">Full name</label>
//             <br />

//             <input
//               name="fullName"
//               className="container__element__inputBox"
//               id="fullName"
//               placeholder="Ngọc Thạch"
//             />
//             <br />

//             <span className="container__element__error"></span>
//           </div>
//           <div className="container__element --inputBox">
//             <label htmlFor="email">Email</label>
//             <br />
//             <input
//               name="email"
//               className="container__element__inputBox"
//               id="email"
//               placeholder="email@domain.com"
//             />
//             <br />
//             <span className="container__element__error"></span>
//           </div>
//           <div className="container__element --inputBox">
//             <label htmlFor="password">Password</label>
//             <br />
//             <input
//               name="password"
//               type="password"
//               className="container__element__inputBox"
//               id="password"
//               placeholder="Nhập mật khẩu"
//             />
//             <br />
//             <span className="container__element__error"></span>
//           </div>
//           <div className="container__element --inputBox">
//             <label htmlFor="confirmPassword">Confirm password</label>
//             <br />
//             <input
//               name="confirmPassword"
//               type="password"
//               className="container__element__inputBox"
//               id="confirmPassword"
//               placeholder="Nhập lại mật khẩu"
//             />
//             <br />
//             <span className="container__element__error"></span>
//           </div>
//           <div className="container__element">
//             <div className="container__element__RadioChild --inputRadio --optionsBox">
//               <label htmlFor="Male">Male</label>
//               <input
//                 name="gender"
//                 type="radio"
//                 className="container__element__inputBox"
//                 value="male"
//               />
//               <label htmlFor="Female">Female</label>
//               <input
//                 name="gender"
//                 type="radio"
//                 className="container__element__inputBox"
//                 value="female"
//               />
//               <label htmlFor="Other">Other</label>
//               <input
//                 name="gender"
//                 type="radio"
//                 className="container__element__inputBox"
//                 value="other"
//               />
//             </div>
//             <span className="container__element__error"></span>
//           </div>
//           <div className="container__element --inputBox --typeSelect --optionsBox">
//             <div className="container__elementSelectChild">
//               <label htmlFor="Province">Province</label>

//               <select name="province" id="province" className="--inputSelect">
//                 <option value="">--Province--</option>
//                 <option value="hn">Ha Noi</option>
//                 <option value="hcm">Ho Chi Minh</option>
//               </select>
//             </div>
//             <span className="container__element__error"></span>
//           </div>
//           <div className="container__element">
//             <div className="container__elementCheckBoxChild --inputCheckBox --optionsBox">
//               <label htmlFor="student">Student</label>
//               <input
//                 name="job"
//                 type="checkbox"
//                 className="container__element__inputCheckBox"
//                 value="student"
//               />
//               <label htmlFor="work">Work</label>
//               <input
//                 name="job"
//                 type="checkbox"
//                 className="container__element__inputCheckBox"
//                 value="work"
//               />
//               <label htmlFor="both">Both</label>
//               <input
//                 name="job"
//                 type="checkbox"
//                 className="container__element__inputCheckBox"
//                 value="both"
//               />
//             </div>

//             <span className="container__element__error"></span>
//           </div>
//           <button type="submit" className="container__element --button">
//             Đăng kí
//           </button>
//         </div>
//       </form>
//     </div>
//     {Validator({
//       form: "#form-1",
//       formContainer: "#container__form-1",
//       validDisplayText: "--valid",
//       validDisplayBox: "--validBox",
//       classNameDisplayRegister: ".mainContainer_alert",
//       mainBoxCss: "mainContainer__alertStage",
//       parentSelector: ".container__element",
//       setVaildCssOptionsBox: ".--optionsBox",
//       rules: [
//         Validator.isRequired("#fullName"),
//         Validator.isRequired("#email"),
//         Validator.isEmail("#email"),
//         Validator.isRequiredPassword("#password"),
//         Validator.isRequired("#confirmPassword"),
//         Validator.isConfirmPassword("#confirmPassword", "#password"),
//         Validator.isRequiredBox("radio"),
//         Validator.isRequired("#province"),
//         Validator.isRequiredBox("checkbox"),
//       ],
//       getRespone: function (data) {
//         console.log(data);
//       },
//     })}
//   </>
// );

// return (
//   <>
//     <form id={"container__form-1"}>
//       <div id="form-1" className="container">
//         <div
//           className={"container-fluid d-flex flex-column align-items-center"}
//         >
//           <div className={"titleContainer"}>
//             <div>Sign up</div>
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               value={CCCD}
//               placeholder="CCCD"
//               onChange={(ev) => setCCCD(ev.target.value)}
//               className={"inputBox"}
//               type="text"
//               required
//             />
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               value={username}
//               placeholder="Tên đăng nhập"
//               onChange={(ev) => setUsername(ev.target.value)}
//               className={"inputBox"}
//               type="text"
//               required
//             />
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               value={firstname}
//               placeholder="Tên (*Anh)"
//               onChange={(ev) => setFirstname(ev.target.value)}
//               className={"inputBox"}
//               type="text"
//               required
//             />
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               value={lastname}
//               placeholder="Họ và tên đệm (*Nguyễn Văn)"
//               onChange={(ev) => setLastname(ev.target.value)}
//               className={"inputBox"}
//               type="text"
//               required
//             />
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <select
//               value={gender}
//               onChange={(ev) => setGender(ev.target.value)}
//               className="inputBox"
//               required
//             >
//               <option value="M">Male</option>
//               <option value="F">Female</option>
//               <option value="O">Other</option>
//             </select>
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               value={phone}
//               placeholder="Số điện thoại"
//               onChange={(ev) => {
//                 setPhone(ev.target.value);
//                 // setPhoneList((prev) => {

//                 //   return [...prev, ];
//                 // })
//               }}
//               className={"inputBox"}
//               data-validate="{required:true, 'validate-number':true, 'validate-phoneLax': true}"
//               type="text"
//               required
//             />
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               id={"password"}
//               value={email}
//               placeholder="Địa chỉ email"
//               onChange={(ev) => setEmail(ev.target.value)}
//               className={"inputBox"}
//               type="email"
//               required
//             />
//             <span class="container__element__error"></span>
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               type="date"
//               placeholder="Enter BirthDate"
//               value={birthdate}
//               onChange={(ev) => setBirthdate(ev.target.value)}
//               name="birthdate"
//               max={current}
//             />
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               value={password}
//               placeholder="Mật khẩu"
//               onChange={(ev) => setPassword(ev.target.value)}
//               className={"inputBox"}
//               type="password"
//               required
//             />
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <input
//               value={reEnterPassword}
//               placeholder="Xác nhận mật khẩu"
//               onChange={(ev) => setReEnterPassword(ev.target.value)}
//               className={"inputBox"}
//               type="password"
//               required
//             />
//           </div>
//           <br />
//           <div className={"inputContainer"}>
//             <button className={"buttonContainer"} onClick={handleSignup}>
//               Sign up
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//     {/* {Validator({
//       form: "#form-1",
//       formContainer: "#container__form-1",
//       validDisplayText: "--valid",
//       validDisplayBox: "--validBox",
//       classNameDisplayRegister: ".mainContainer_alert",
//       mainBoxCss: "mainContainer__alertStage",
//       parentSelector: ".container__element",
//       setVaildCssOptionsBox: ".--optionsBox",
//       rules: [
//         // Validator.isRequired("#fullName"),
//         // Validator.isRequired("#email"),
//         Validator.isEmail("#email"),
//         // Validator.isRequiredPassword("#password"),
//         // Validator.isRequired("#confirmPassword"),
//         // Validator.isConfirmPassword("#confirmPassword", "#password"),
//         // Validator.isRequiredBox("radio"),
//         // Validator.isRequired("#province"),
//         // Validator.isRequiredBox("checkbox"),
//       ],
//       getRespone: function (data) {
//         console.log(data);
//       },
//     })} */}
//   </>
// );
// };

// export default Signup;
