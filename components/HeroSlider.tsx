"use client";

import Image from "next/image";
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
  },
  {
    tag: "Explore every shelf",
    title: "Discover your next favourite read",
    text: "Fiction, science, history and stories for kids, all in one cozy corner.",
  },
  {
    tag: "Built by readers",
    title: "Share your own shelf with others",
    text: "Add the books you love, and let other readers borrow them for a few days.",
  },
];

export default function HeroSlider() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        navigation
        pagination={{ clickable: true }}
        style={
          {
            "--swiper-navigation-color": "#ffffff",
            "--swiper-pagination-color": "#fbbf24",
          } as React.CSSProperties
        }
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-[440px] w-full overflow-hidden bg-emerald-950 text-white md:h-[540px]">
              <Image
                src="/hero-library.jpg"
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/20" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/40 to-transparent" />

              <div className="relative mx-auto flex h-full max-w-7xl flex-col items-start justify-center gap-5 px-6 md:px-10">
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  {slide.tag}
                </span>
                <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
                  {slide.title}
                </h1>
                <p className="max-w-xl text-base text-white/85 md:text-lg">
                  {slide.text}
                </p>
                <div className="flex flex-wrap items-center gap-3">
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}