import React from 'react'
import { useState } from "react";
import { toast } from "react-hot-toast";
import Axios from "axios";

export default function Loginpage() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const BodyGetUrl = {
    "recipientKeys": ["did:key:z6MkgkvoawzSCE1ugzr3hcK3fH2Cy3vWgeijkbF5fm5cy9m3"],
    "serviceEndpoint": "http://host.docker.internal:8020"
  }

  const [isLoggedIn, setisLoggedIn] = React.useState(false);
  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const resp = await Axios.post(`http://localhost:3004/backend/user/logiN`, {
        email: formValue.email,
        password: formValue.password,
      });

      if (resp.data) {
        Axios.post(`http://localhost:8021/connections/create-invitation`, BodyGetUrl)
        .then((res) => {  ;
          Axios.post(`http://localhost:8041/connections/receive-invitation`,res.data.invitation)
        })
        .catch((err) =>{ setError(err);console.log(err)});
        localStorage.setItem("token", resp.data);
        setisLoggedIn(true);
        toast.success("Welcome back :)", {
          position: "bottom-center",
          duration: 5000,
        });
      }
    } catch (error) {
      if (error.response) {
        console.log(error)
        toast.error("Please enter a valid Email/Password");
      }
    }
  };
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  React.useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }, [isLoggedIn]);
  return (
    <>
      <section className="home mt-4 mt-3 pt-3 pb-3">
        <ol class="breadcrumb ml-4 pl-4">
          <li class="breadcrumb-item "><a href="\">Home</a></li>

          <li class="breadcrumb-item active" aria-current="page">Log In</li>

        </ol>
        <div class="row">
          <div class="col-md-6 ml-4">
            <form class="px-4 py-3 mt-6  pt-5 needs-validation" >
              <div class="mb-3">
                <label for="validationCustom01" class="form-label is-required">Email</label>
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  id="validationCustom01"
                  placeholder='Email'
                  style={{ width: "75%" }}
                  value={formValue.email}
                  onChange={onChange}
                  required />
                <div class="valid-feedback">
                  Looks good!
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleDropdownFormPassword1" class="form-label is-required">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={onChange}
                  value={formValue.password}
                  class="form-control"
                  id="exampleDropdownFormPassword1"
                  placeholder="Password"
                  style={{ width: "75%" }}
                  required />
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="dropdownCheck" />
                  <label class="form-check-label" for="dropdownCheck">
                    Remember me
                  </label>
                </div>
              </div>
              <button type="submit"
                class="btn btn-primary mt-2"
                style={{ width: '75%' }}
                onClick={LoginUser}>Sign in</button>
            </form>
            <div class="dropdown-divider"></div>
          </div>
          <div class="col-md-6 mt-6  pt-5">
            <img src="Screenshot 2023-07-05 004610.jpg" class="rounded " style={{ width: "50%" }} alt="..." />
          </div>
        </div>
      </section>
    </>
  )
}
