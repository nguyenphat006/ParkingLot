"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AlertSuccess from "../Alerts/AlertSuccess";
import AlertError from "../Alerts/AlertError";

export default function SigninWithPassword() {
  const [data, setData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [alert, setAlert] = useState<{ title: string; body: string } | null>(null);
  const [error, setError] = useState<{ title: string; body: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5133/api/Authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setAlert({
          title: "Đăng nhập thành công",
          body: "Bạn đã đăng nhập thành công.",
        });
        setTimeout(() => {
          setAlert(null);
          window.location.href = "/";
        }, 3000);
      } else {
        const errorMessage = result.loi || (Array.isArray(result) ? result.join(", ") : "An error occurred during login.");
        setError({
          title: "Đăng nhập thất bại",
          body: errorMessage,
        });
        setTimeout(() => {
          setError(null);
        }, 3000);
        console.error(result);
      }
    } catch (error) {
      setError({
        title: "Đăng nhập thất bại",
        body: "An error occurred during login.",
      });
      setTimeout(() => {
        setError(null);
      }, 3000);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="fixed top-4 right-4 transition-transform duration-300 transform" style={{ transform: alert || error ? 'translateY(0)' : 'translateY(-100%)' }}>
        {alert && <AlertSuccess message={alert} />}
        {error && <AlertError message={error} />}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="mb-2.5 block font-medium text-dark dark:text-white"
          >
            Tài khoản
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Nhập tài khoản của bạn"
              name="username"
              value={data.username}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            <span className="absolute right-4.5 top-1/2 -translate-y-1/2">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.11756 2.979H12.8877C14.5723 2.97899 15.9066 2.97898 16.9509 3.11938C18.0256 3.26387 18.8955 3.56831 19.5815 4.25431C20.2675 4.94031 20.5719 5.81018 20.7164 6.8849C20.8568 7.92918 20.8568 9.26351 20.8568 10.9481V11.0515C20.8568 12.7362 20.8568 14.0705 20.7164 15.1148C20.5719 16.1895 20.2675 17.0594 19.5815 17.7454C18.8955 18.4314 18.0256 18.7358 16.9509 18.8803C15.9066 19.0207 14.5723 19.0207 12.8876 19.0207H9.11756C7.43295 19.0207 6.09861 19.0207 5.05433 18.8803C3.97961 18.7358 3.10974 18.4314 2.42374 17.7454C1.73774 17.0594 1.4333 16.1895 1.28881 15.1148C1.14841 14.0705 1.14842 12.7362 1.14844 11.0516V10.9481C1.14842 9.26351 1.14841 7.92918 1.28881 6.8849C1.4333 5.81018 1.73774 4.94031 2.42374 4.25431C3.10974 3.56831 3.97961 3.26387 5.05433 3.11938C6.09861 2.97898 7.43294 2.97899 9.11756 2.979ZM5.23755 4.48212C4.3153 4.60611 3.78396 4.83864 3.39602 5.22658C3.00807 5.61452 2.77554 6.14587 2.65155 7.06812C2.5249 8.01014 2.52344 9.25192 2.52344 10.9998C2.52344 12.7478 2.5249 13.9895 2.65155 14.9316C2.77554 15.8538 3.00807 16.3852 3.39602 16.7731C3.78396 17.161 4.3153 17.3936 5.23755 17.5176C6.17957 17.6442 7.42135 17.6457 9.16927 17.6457H12.8359C14.5839 17.6457 15.8256 17.6442 16.7677 17.5176C17.6899 17.3936 18.2213 17.161 18.6092 16.7731C18.9971 16.3852 19.2297 15.8538 19.3537 14.9316C19.4803 13.9895 19.4818 12.7478 19.4818 10.9998C19.4818 9.25192 19.4803 8.01014 19.3537 7.06812C19.2297 6.14587 18.9971 5.61452 18.6092 5.22658C18.2213 4.83864 17.6899 4.60611 16.7677 4.48212C15.8256 4.35546 14.5839 4.354 12.8359 4.354H9.16927C7.42135 4.354 6.17958 4.35546 5.23755 4.48212ZM4.97445 6.89304C5.21753 6.60135 5.65104 6.56194 5.94273 6.80502L7.92172 8.45418C8.77693 9.16685 9.37069 9.66005 9.87197 9.98246C10.3572 10.2945 10.6863 10.3993 11.0026 10.3993C11.3189 10.3993 11.648 10.2945 12.1332 9.98246C12.6345 9.66005 13.2283 9.16685 14.0835 8.45417L16.0625 6.80502C16.3542 6.56194 16.7877 6.60135 17.0308 6.89304C17.2738 7.18473 17.2344 7.61825 16.9427 7.86132L14.9293 9.5392C14.1168 10.2163 13.4582 10.7651 12.877 11.1389C12.2716 11.5283 11.6819 11.7743 11.0026 11.7743C10.3233 11.7743 9.73364 11.5283 9.12818 11.1389C8.54696 10.7651 7.88843 10.2163 7.07594 9.5392L5.06248 7.86132C4.77079 7.61825 4.73138 7.18473 4.97445 6.89304Z"
                  fill=""
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="mb-2.5 block font-medium text-dark dark:text-white"
          >
            Mật khẩu
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Nhập mật khẩu của bạn"
              autoComplete="password"
              value={data.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            <span
              className="absolute right-4.5 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 17C13.1046 17 14 16.1046 14 15C14 13.8954 13.1046 13 12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C9.23858 2 7 4.23858 7 7V9H5C3.89543 9 3 9.89543 3 11V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V11C21 9.89543 20.1046 9 19 9H17V7C17 4.23858 14.7614 2 12 2ZM9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7V9H9V7ZM5 11H19V19H5V11Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C9.23858 2 7 4.23858 7 7V9H5C3.89543 9 3 9.89543 3 11V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V11C21 9.89543 20.1046 9 19 9H17V7C17 4.23858 14.7614 2 12 2ZM9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7V9H9V7ZM5 11H19V19H5V11Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </span>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between gap-2 py-2">
          <label
            htmlFor="remember"
            className="flex cursor-pointer select-none items-center font-satoshi text-base font-medium text-dark dark:text-white"
          >
            <input
              type="checkbox"
              name="remember"
              id="remember"
              checked={data.remember}
              onChange={handleChange}
              className="peer sr-only"
            />
            <span
              className={`mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md border border-stroke bg-white text-white text-opacity-0 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-opacity-100 dark:border-stroke-dark dark:bg-white/5 ${
                data.remember ? "bg-primary" : ""
              }`}
            >
              <svg
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.70692 0.292787C9.89439 0.480314 9.99971 0.734622 9.99971 0.999786C9.99971 1.26495 9.89439 1.51926 9.70692 1.70679L4.70692 6.70679C4.51939 6.89426 4.26508 6.99957 3.99992 6.99957C3.73475 6.99957 3.48045 6.89426 3.29292 6.70679L0.292919 3.70679C0.110761 3.51818 0.00996641 3.26558 0.0122448 3.00339C0.0145233 2.74119 0.119692 2.49038 0.3051 2.30497C0.490508 2.11956 0.741321 2.01439 1.00352 2.01211C1.26571 2.00983 1.51832 2.11063 1.70692 2.29279L3.99992 4.58579L8.29292 0.292787C8.48045 0.105316 8.73475 0 8.99992 0C9.26508 0 9.51939 0.105316 9.70692 0.292787Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            Ghi nhớ đăng nhập
          </label>

          <Link
            href="/auth/forgot-password"
            className="select-none font-satoshi text-base font-medium text-dark underline duration-300 hover:text-primary dark:text-white dark:hover:text-primary"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <div className="mb-4.5">
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
          >
            Đăng nhập
          </button>
        </div>
      </form>
    </>
  );
}
