"use client"
import Container from "../../Container/Container";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  title: string;
}

const BannerText = ({ title }: Props) => {
  return (
    <div className="hidden lg:inline-block absolute top-0 left-0 w-full h-full">
      <Container className="flex flex-col gap-y-6 justify-center h-full">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white font-bold text-7xl"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-lg text-slate-100"
        >
          Stock up on keyware and limited edition collections on our <br />
          awesome mid year sale.
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex gap-x-4 mt-2"
        >
          <button className="px-6 py-3 bg-slate-100 hover:bg-white text-sm uppercase font-semibold rounded-full duration-200 gap-x-3">
            Find out more
          </button>
          <Link href="/products">
            <button className="px-6 py-3 bg-slate-100 hover:bg-white text-sm uppercase font-semibold rounded-full duration-200">
              Shop now
            </button>
          </Link>
        </motion.div>
      </Container>
    </div>
  );
};

export default BannerText;
