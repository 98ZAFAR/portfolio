'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const techLogos = [
  '/logos/react.svg',
  '/logos/nextjs.svg',
  '/logos/tailwind.svg',
  '/logos/nodejs.svg',
  '/logos/express.svg',
  '/logos/mongodb.svg',
  '/logos/mysql.svg',
  '/logos/github.svg',
  '/logos/postman.svg',
];

export default function TechCarousel() {
  return (
    <section
      className="
        w-full mt-16 py-12
        bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]
        transition-colors duration-300
      "
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-[var(--color-primary)]">
        Tech <span className="text-[var(--color-accent)]">I Use</span>
      </h2>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 overflow-visible pb-12">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={2}
          loop
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 5, spaceBetween: 40 },
          }}
        >
          {techLogos.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="
                  flex items-center justify-center p-6
                  bg-[var(--color-bg-light)]/50 dark:bg-[var(--color-bg-dark)]/50
                  border border-[var(--color-border)] rounded-lg
                  shadow-md hover:shadow-lg
                  transform hover:scale-105 transition-all duration-300
                  cursor-pointer mt-2 mb-2
                "
              >
                <Image
                  src={src}
                  alt={`Technology logo ${idx + 1}`}
                  width={64}
                  height={64}
                  className="
                    h-12 md:h-16 w-auto object-contain
                    filter grayscale hover:grayscale-0
                    transition-all duration-300
                  "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
