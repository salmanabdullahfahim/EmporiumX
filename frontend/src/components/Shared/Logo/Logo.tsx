import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      href="/"
      className="text-2xl md:text-[1.7rem] font-semibold cursor-pointer duration-200 flex items-center justify-center italic gap-x-3"
    >
      <Image
        src="https://res.cloudinary.com/dwhmtgghz/image/upload/v1733315542/vecteezy_letter-e-gradient-logo-design_-removebg-preview_pjgzet.png"
        alt="Logo"
        width={70}
        height={70}
        className="mt-2"
      />
      <p className="text-md">
        Emporium<span className=" text-blue-500">X</span>
      </p>
    </Link>
  );
};

export default Logo;
