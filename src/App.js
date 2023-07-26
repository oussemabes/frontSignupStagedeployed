import './App.css';
import React from 'react'
import { useState } from "react";
import Axios from "axios";

function App() {
  const [formValue, setFormValue] = useState({
    ref:"",
    email:"",
    name: "",
    password:"",
    age: "",
    gender:""
  });
const Add_New_User = async (e) => {
    const token = localStorage.getItem('token'); //

    // Set the headers with the token
    const headers = {
        'Authorization': `Bearer ${token}`, // Include the 'Bearer' prefix for JWT token
        'Content-Type': 'application/json',
    };
    e.preventDefault();
    try {
      const resp = await Axios.post(`http://18.197.128.8:3001/backend/user/register`, {
        ref:formValue.ref,
        name: formValue.name,
        email: formValue.email,
        password:formValue.password,
        admin:"false",
        age:formValue.age,
        gender:formValue.gender
      },{headers});

      if (resp.data) {

        
        window.location.href = "/";

      }
    } catch (error) {
      if (error.response) {
        console.log(error)
        console.log(formValue.name,formValue.disease)
      }
    }
  };
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  return (
    <main class="bd-content order-1">
    <div class="bg-body title-bar">
      <div class="container-xxl d-block">
        <div class="row">
          <div class="col-sm-12 col-lg-5 offset-lg-3">
            <h1 class="display-1">Register</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container-xxl pt-4">
      <div class="row">
        <div class="col-sm-12 col-lg-5 offset-lg-3">
 
          <form class="needs-validation mb-5" novalidate>
            <div class="row">
              <div class="col-12">
                <p class="fw-bold mb-4">
                  <span class="text-primary me-1">*</span>indicates required
                </p>
              </div>
             
              <div class="col-12">
                <div class="mb-3">
                  <label for="studyname" id="studynameLabel" class="form-label is-required">ref</label>
                  <input type="text"
                   class="form-control" 
                    id="ref"
                    name="ref"
                    onChange={onChange}
                    value={formValue.ref}
                    autocomplete="given-name"   
         
                    required
                    />
                  <div class="valid-feedback">
                    Looks good!
                  </div>
                  <div id="studynameFeedback" class="invalid-feedback">
                    Please enter a valid study name.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="studyname" id="studynameLabel" class="form-label is-required">name</label>
                  <input type="text"
                   class="form-control" 
                    id="name"
                    name="name"
                    onChange={onChange}
                    value={formValue.name}
                    autocomplete="given-name"   
         
                    required
                    />
                  <div class="valid-feedback">
                    Looks good!
                  </div>
                  <div id="studynameFeedback" class="invalid-feedback">
                    Please enter a valid study name.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="Disease" id="DiseaseLabel" class="form-label is-required">email</label>
                  <input type="email"
                   class="form-control" 
                   id="email" 
                   name="email"
                   onChange={onChange}
                   value={formValue.email}
                   aria-labelledby="DiseaseLabel DiseaseFeedback" 
                   autocomplete="family-name"

                    required />
                  <div class="valid-feedback">
                    Looks good!
                  </div>
                  <div id="DiseaseFeedback" class="invalid-feedback">
                    Please enter a valid disease.
                  </div>
                </div>

                <div class="mb-3">
                  <label for="Disease" id="DiseaseLabel" class="form-label is-required">password</label>
                  <input type="password"
                   class="form-control" 
                   id="password" 
                   name="password"
                   onChange={onChange}
                   value={formValue.password}
                   aria-labelledby="DiseaseLabel DiseaseFeedback" 
                   autocomplete="family-name"
                    required />
                  <div class="valid-feedback">
                    Looks good!
                  </div>
                  <div id="DiseaseFeedback" class="invalid-feedback">
                    Please enter a valid disease.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="Disease" id="DiseaseLabel" class="form-label is-required">age</label>
                  <input type="number"
                   class="form-control" 
                   id="age" 
                   name="age"
                   onChange={onChange}
                   value={formValue.age}
                   aria-labelledby="DiseaseLabel DiseaseFeedback" 
                   autocomplete="family-name"

                    required />
                  <div class="valid-feedback">
                    Looks good!
                  </div>
                  <div id="DiseaseFeedback" class="invalid-feedback">
                    Please enter a valid disease.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="Disease" id="DiseaseLabel" class="form-label is-required">gender</label>
                  <input type="text"
                   class="form-control" 
                   id="gender" 
                   name="gender"
                   onChange={onChange}
                   value={formValue.gender}
                   aria-labelledby="DiseaseLabel DiseaseFeedback" 
                   autocomplete="family-name"

                    required />
                  <div class="valid-feedback">
                    Looks good!
                  </div>
                  <div id="DiseaseFeedback" class="invalid-feedback">
                    Please enter a valid disease.
                  </div>
                </div>
                <button type="submit" class="btn btn-primary mt-2" onClick={Add_New_User}>Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
  );
}

export default App;
