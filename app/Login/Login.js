"use client";

import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./styles.css";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, "user@example.com", "1Password")
      .then((userCredential) => {
        console.log(userCredential);
        router.push("/galleryHomePage");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          <Link href="/galleryHomepage">Login</Link>
        </button>
      </form>
    </div>
  );
};

export default Login;
