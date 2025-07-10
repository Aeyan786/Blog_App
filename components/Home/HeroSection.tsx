import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";


const HeroSection = () => {
  return (
    <section
      className="relative min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-950 to-indigo-950"

    >
      <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-gradient-to-r before:from-violet-600/20 before:to-indigo-600/20 before:blur-3xl" />

      <div className="container relative mx-auto flex h-full flex-col items-center justify-center gap-10 px-4 py-24 md:flex-row md:py-20">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h1 className="text-4xl capitalize font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Decode the digital world through{" "}
            <span className="bg-gradient-to-r from-violet-200 bg-clip-text text-transparent">
              words
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
            Dive into the world of modern development. From frontend finesse to backend mastery,
            we break down code, concepts, and tools. Learn, build, and grow — one post at a time.
          </p>

          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-start">
            <Button className="rounded-full">Start Reading</Button>
            <Button variant="outline" className="rounded-full">
              Explore Topics
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8 text-white md:max-w-md">
            <div className="space-y-2">
              <div className="text-2xl font-bold">1K+</div>
              <div className="text-sm text-gray-400">Published articles</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-gray-400">Expert writers</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">10M+</div>
              <div className="text-sm text-gray-400">Monthly Readers</div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex-1 md:mt-0">
          <div className="relative mx-auto h-74 w-74 overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-primary/20 backdrop-blur-lg shadow-2xl shadow-indigo-600/10">
            <Image
              src="https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              priority
              sizes="256px"
              alt="Tech blog cover image"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
