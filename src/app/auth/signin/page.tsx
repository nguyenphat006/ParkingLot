import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Signin from "@/components/Auth/Signin";

export const metadata: Metadata = {
  title: "Trang Đăng Nhập Next.js | NextAdmin - Bộ Công Cụ Dashboard Next.js",
  description: "Đây là Trang Đăng Nhập Next.js Bộ Công Cụ Dashboard NextAdmin",
};

const SignIn: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card w-full max-w-[1200px] mx-4 sm:mx-8 lg:mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-3/5">
            <div className="w-full p-6 sm:p-8 lg:p-14 xl:p-18">
              <Signin />
            </div>
          </div>

          <div className="hidden lg:block w-full p-9 lg:w-2/5">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
              <Link className="mb-10 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo-dark.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>
              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                Đăng nhập vào tài khoản của bạn
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Chào Mừng Trở Lại!
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                Vui lòng đăng nhập vào tài khoản của bạn bằng cách hoàn thành các
                trường cần thiết dưới đây
              </p>

              <div className="mt-31">
                <Image
                  src={"/images/grids/grid-02.svg"}
                  alt="Logo"
                  width={405}
                  height={325}
                  className="mx-auto dark:opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
