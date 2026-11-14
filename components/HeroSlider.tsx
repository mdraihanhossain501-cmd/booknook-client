"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    title: "Add a book, borrow a book, return a book",
    text: "BookNook is a small online library where every reader can share and borrow books.",
    bg: "bg-linear-to-br from-primary to-secondary",
  },
  {
    title: "Discover your next favourite read",
    text: "Fiction, science, history and stories for kids, all in one cozy corner.",
    bg: "bg-linear-to-br from-secondary to-accent",
  },
  {
    title: "Share your own shelf with others",
    text: "Add the books you love, and let other readers borrow them for a few days.",
    bg: "bg-linear-to-br from-accent to-primary",
  },
];

export default function HeroSlider() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        navigation
        pagination={{ clickable: true }}
        className="overflow-hidden rounded-2xl"
        style={
          {
            "--swiper-navigation-color": "#ffffff",
            "--swiper-pagination-color": "#ffffff",
          } as React.CSSProperties
        }
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div
              className={`flex h-[420px] flex-col items-center justify-center gap-5 px-6 text-center text-white md:h-[500px] ${slide.bg}`}
            >
              <h1 className="max-w-3xl text-3xl font-bold md:text-5xl">
                {slide.title}
              </h1>
              <p className="max-w-xl text-base md:text-lg">{slide.text}</p>
              <Link href="/books" className="btn btn-lg btn-neutral">
                Browse Books
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}