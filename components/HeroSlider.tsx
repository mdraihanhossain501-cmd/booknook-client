"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    tag: "Your online library",
    title: "Add a book, borrow a book, return a book",
    text: "BookNook is a small online library where every reader can share and borrow books.",
    bg: "bg-linear-to-br from-emerald-800 to-teal-950",
  },
  {
    tag: "Explore every shelf",
    title: "Discover your next favourite read",
    text: "Fiction, science, history and stories for kids, all in one cozy corner.",
    bg: "bg-linear-to-br from-teal-800 to-emerald-950",
  },
  {
    tag: "Built by readers",
    title: "Share your own shelf with others",
    text: "Add the books you love, and let other readers borrow them for a few days.",
    bg: "bg-linear-to-br from-emerald-900 to-stone-900",
  },
];

export default function HeroSlider() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        navigation
        pagination={{ clickable: true }}
        className="overflow-hidden rounded-2xl shadow-lg"
        style={
          {
            "--swiper-navigation-color": "#ffffff",
            "--swiper-pagination-color": "#fbbf24",
          } as React.CSSProperties
        }
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div
              className={`relative flex h-[420px] flex-col items-center justify-center gap-5 overflow-hidden px-6 text-center text-white md:h-[500px] ${slide.bg}`}
            >
              <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-amber-300/15 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-emerald-300/15 blur-2xl" />

              <span className="relative rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm tracking-wide backdrop-blur">
                {slide.tag}
              </span>
              <h1 className="relative max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
                {slide.title}
              </h1>
              <p className="relative max-w-xl text-base text-white/85 md:text-lg">
                {slide.text}
              </p>
              <div className="relative flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/books"
                  className="btn btn-lg border-0 bg-amber-400 text-neutral-900 hover:bg-amber-300"
                >
                  Browse Books
                </Link>
                <Link
                  href="/add-book"
                  className="btn btn-lg btn-outline border-white/60 text-white hover:border-white hover:bg-white hover:text-neutral-900"
                >
                  Add a Book
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}