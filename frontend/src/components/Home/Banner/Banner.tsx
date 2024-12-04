"use client";
import Image from "next/image";
import Slider from "react-slick";
import { PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";
import BannerText from "./BannerText";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerImage1 from "../../../../public/1.png";
import BannerImage2 from "../../../../public/2.png";

interface ArrowProps {
  onClick?: () => void;
}

const Banner = () => {
  const PrevArrow = ({ onClick }: ArrowProps) => {
    return (
      <div
        className="bg-slate-100 hover:bg-white rounded-full cursor-pointer absolute right-5 top-1/2 z-20 flex justify-center items-center p-3"
        onClick={onClick}
      >
        <PiCaretRightLight />
      </div>
    );
  };

  const NextArrow = ({ onClick }: ArrowProps) => {
    return (
      <div
        className="bg-slate-100 hover:bg-white rounded-full cursor-pointer absolute left-5 top-1/2 z-20 flex justify-center items-center p-3"
        onClick={onClick}
      >
        <PiCaretLeftLight />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        <div className="w-full h-full relative">
          <div className="relative w-full h-[500px]">
            <Image
              src={BannerImage1}
              alt="Keyboard 3"
              fill
              priority
              className="object-cover"
            />
          </div>
          <BannerText title="Apple Ecosys" />
        </div>
        <div className="w-full h-full relative">
          <div className="relative w-full h-[500px]">
            <Image
              src={BannerImage2}
              alt="banner2"
              fill
              priority
              className="object-cover"
            />
          </div>
          <BannerText title="Casual Headset" />
        </div>
        {/* <div className="w-full h-full relative">
          <div className="relative w-full h-[500px]">
            <Image
              src="/bannerfive.png"
              alt="banner2"
              fill
              priority
              className="object-cover"
            />
          </div>
          <BannerText title="Limited Edition" />
        </div> */}
      </Slider>
      <div className="absolute w-full h-20 bg-gradient-to-t from-gray-100 to-transparent -bottom-3 left-0 z-10" />
    </div>
  );
};

export default Banner;
