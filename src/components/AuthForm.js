import React, { useState } from "react";
import supabase from "../supabaseClient";

export default function AuthForm({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("employee"); // or "manager"
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      // Signup flow
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) return setError(signUpError.message);

      // Add to profiles table
      const { user } = data;
      await supabase.from("profiles").insert([
        {
          id: user?.id,
          email,
          full_name: fullName,
          role,
        },
      ]);

      alert("Signup successful ✅ Now login.");
      setIsSignup(false);
    } else {
      // Login flow
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) return setError("Invalid credentials");

      onLogin(data.session);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">{isSignup ? "Sign Up" : "Login"}</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isSignup && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border px-3 py-2 rounded"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          {isSignup ? "Create Account" : "Login"}
        </button>

        <p
          className="text-center text-sm text-blue-600 mt-2 cursor-pointer"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Login" : "New here? Sign up"}
        </p>
      </form>
    </div>
  );
}
