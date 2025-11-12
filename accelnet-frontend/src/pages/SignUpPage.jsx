import { Link, useNavigate } from "react-router-dom"; // 1. Import useNavigate
import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  // 3. Change state from username to first_name and last_name
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signup] = useAuthStore();
  const navigate = useNavigate(); // 5. Get the navigate function

  const handleSignUp = async (e) => { // 6. Make the function async
    e.preventDefault();
    setError(""); // Clear old errors

    // Optional: Add client-side password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const result = await signup({email, password, first_name, last_name});
      if(result?.success){
        navigate('/');
      }else{
        setError(result?.message || "Sign up failed. Please try again.")
      }
    } catch (err) {
      console.error(err);
      // Set error from backend response if available
    }
  };

	return (
		<div className='h-screen w-full bg-gradient-to-br from-blue-900 via-black to-black overflow-hidden relative'>
			<header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
				<Link to={"/"}>
					<img src='/brain.svg' alt='logo' className='w-24' />
				</Link>
			</header>

			<div className='flex justify-center items-center mt-[-50px] mx-3'>
				<div className='w-full max-w-md p-8 space-y-6 bg-blue-900 rounded-lg shadow-md '>
					<h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>

          {/* 9. Show error message if it exists */}
          {error && (
            <div className="bg-red-800 text-white p-3 rounded-md text-center text-sm">
              {error}
            </div>
          )}

					<form className='space-y-4' onSubmit={handleSignUp}>
						<div>
							<label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
								Email
							</label>
							<input
								type='email'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='you@example.com'
								id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
							/>
						</div>

            {/* 10. Replace "Username" with "First Name" and "Last Name" */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor='first_name' className='text-sm font-medium text-gray-300 block'>
                  First Name
                </label>
                <input
                  type='text'
                  className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                  placeholder='Brandon'
                  id='first_name'
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="w-1/2">
                <label htmlFor='last_name' className='text-sm font-medium text-gray-300 block'>
                  Last Name
                </label>
                <input
                  type='text'
                  className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                  placeholder='Tran'
                  id='last_name'
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

						<div>
							<label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
								Password
							</label>
							<input
								type='password'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='••••••••'
								id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
							/>
						</div>

						<button
							className='w-full py-2 bg-blue-600 text-white font-semibold rounded-md
							hover:bg-blue-700'
						>
              Sign Up
						</button>
					</form>
					<div className='text-center text-gray-400'>
						Already a member?{" "}
						<Link to={"/login"} className='text-blue-500 hover:underline'>
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default SignUpPage;