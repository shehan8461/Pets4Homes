import React, { useState } from 'react';

export default function AdminRegister() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(user.email)) {
      errors.email = 'Invalid email format';
    }

    // Password validation
    if (!user.password.trim()) {
      errors.password = 'Password is required';
    } else if (user.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if there are no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      try {
        const res = await fetch('/api/admin/admin_signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (res.ok) {
          alert('Registration successful');
          // You can add further actions like redirecting the user here
        } else {
          const data = await res.json();
          alert(`Registration failed: ${data.message}`);
        }
      } catch (error) {
        alert('An error occurred while registering. Please try again.');
      }
    }
  };

  return (
    <div className="add-user">
      <h2><b>Create An Account</b></h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" id="username" name="username" value={user.username} onChange={handleOnChange} /><br />
        
        <label>Email Address:</label>
        <input type="text" id="email" name="email" value={user.email} onChange={handleOnChange} /><br />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}<br />
        
        <label>Password:</label>
        <input type="password" id="password" name="password" value={user.password} onChange={handleOnChange} /><br />
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}<br />
        
        <br />
        <button type="submit">Register</button>
      </form>
      <br />
      <button>
        <a href="afterlogorsign">Next</a>
      </button>
    </div>
  );
}
