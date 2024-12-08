"use client";
import Link from "next/link";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SignupWithPassword from "../SignupWithPassword";

export default function Signup() {
  return (
    <>
      <h2 className="text-center text-3xl font-bold mb-8 text-black">Đăng ký tài khoản</h2>
      <div>
        <SignupWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Đã có tài khoản?{" "}
          <Link href="/auth/signin" className="text-primary">
            Đăng nhập
          </Link>
        </p>
      </div>
    </>
  );
}
