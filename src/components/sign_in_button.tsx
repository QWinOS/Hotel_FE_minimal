"use client";

import { auth } from "@/auth";
import { login, logout } from "@/lib/auth";

const SignIn = () => {
  // const session = auth();
  // console.log(session);
  return <button onClick={() => login()}>Sign In</button>;
};
const SignOut = () => {
  // const session = auth();
  // console.log(session);
  return <button onClick={() => logout()}>Sign Out</button>;
};
export { SignIn, SignOut };
