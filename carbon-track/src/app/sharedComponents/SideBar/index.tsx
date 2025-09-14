import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { BsDatabaseFill } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";

const Sidebar = () => (
  <aside className="bg-[#214A5A] w-64 min-h-screen flex flex-col">
    <div className="flex flex-col">
      <div className="flex justify-center items-center bg-[#e7e7e7] w-full h-[150px]">
        <Image
          src="/Images/carbon-logo.svg"
          width={256}
          height={128}
          alt="carbon logo"
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
          priority
        />
      </div>
      <div style={{ marginBottom: "38px" }} />
    </div>
    <nav className="flex flex-col flex-grow px-8 pt-4 gap-2">
      <Link href="#"
        className="flex items-center space-x-3 p-2 rounded-md cursor-pointer transition-all
          hover:bg-[#13303A] hover:text-[#F79B72]">
        <RxDashboard className="h-8 w-8 text-[#F79B72] group-hover:text-[#13303A]" />
        <span className="text-[22px] text-white group-hover:text-[#F79B72]">Dashboard</span>
      </Link>
      <Link href="/records"
        className="flex items-center space-x-3 p-2 rounded-md bg-[#F79B72] text-[#214A5A] font-semibold cursor-pointer">
        <BsDatabaseFill className="h-8 w-8 text-[#214A5A]" />
        <span className="text-[22px]">Records</span>
      </Link>
      <div className="flex-grow" />
      <Link href="#"
        className="flex items-center space-x-3 mb-8 p-2 rounded-md cursor-pointer transition-all
          hover:bg-[#13303A] hover:text-[#F79B72]">
        <CiLogout className="h-8 w-8 text-[#F79B72] group-hover:text-[#13303A]" />
        <span className="text-[22px] text-white group-hover:text-[#F79B72]">Log Out</span>
      </Link>
    </nav>
  </aside>
);

export default Sidebar;