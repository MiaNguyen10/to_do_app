import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router";
import signupBg from "@/assets/signup.jpg";
import { signup, type UserSignup } from "@/api/auth.api";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserSignup>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      console.log("Signup successful:", response);
      navigate("/");
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate(formData);
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
          Create an account
        </h1>        
        <form className="mt-6 space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            placeholder="First Name"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            disabled={signupMutation.isPending}
            className="w-full bg-blue-500 text-white p-2 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {signupMutation.isPending ? "Signing Up..." : "Sign Up"}
          </button>
          {signupMutation.isError && (
            <div className="text-red-500 text-sm text-center">
              Signup failed. Please try again.
            </div>
          )}
          {signupMutation.isSuccess && (
            <div className="text-green-500 text-sm text-center">
              Account created successfully!
            </div>
          )}
        </form>        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
