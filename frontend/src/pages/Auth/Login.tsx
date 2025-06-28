import { login, type UserLogin } from "@/api/auth.api";
import signupBg from "@/assets/signup.jpg";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      console.log("Login successful:", response);
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 hidden xl:flex">
        <img
          src={signupBg}
          alt="Sign Up Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center h-full mx-4 md:mx-0">
        <h1 className="text-3xl sm:text-4xl font-['Geist','Geist_Fallback',sans-serif] font-semibold">
          Log in to your account
        </h1>
        <form
          className="mt-6 space-y-4 w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4">
          {" "}
          Don't have account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
