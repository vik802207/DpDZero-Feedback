import { useState } from "react";
import supabase from "../supabaseClient";

export default function Signup({ setSession }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [name, setName] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return alert(error.message);

    await supabase.from("profiles").insert([
      {
        id: data.user.id,
        full_name: name,
        role,
        manager_id: null, // set manually later if employee
      },
    ]);

    alert("Signup done ✅");
    setSession(data.session);
  };

  return (
    <form onSubmit={handleSignup}>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
}
