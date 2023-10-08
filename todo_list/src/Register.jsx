import React, { useState } from "react";
export const Register = (props) => {

    // const [email, setEmail] = useState('');
    // const [pass, setPass] = useState('');
    // const [name, setName] = useState('');
    const [form, setForm] = useState({})
    const handleForm = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/registration", {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.text()
        alert('Registered Successfully');
        // console.log(email);
        console.log(data)
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full name</label>
                <input  onChange={handleForm} id="name" name="name" placeholder="Full Name" />
                <label htmlFor="email">email</label>
                <input  onChange={handleForm} type="email" placeholder="Enter Your email id " id="email" name="email" />
                <label htmlFor="password">password</label>
                <input  onChange={handleForm} type="password" placeholder="Create password" id="password" name="password" />
                <button type="submit">SignUp</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    )
}