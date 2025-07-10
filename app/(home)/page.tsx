import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Header/Navbar";
import HeroSection from "@/components/Home/HeroSection";
import TopArticles from "@/components/Home/TopArticles";
import { Button } from "@/components/ui/button";
import { ensureUserExists } from "@/lib/userExists";
import Link from "next/link";
import { Suspense } from "react";
import { ArticlePageSkeleton } from "../articles/page";

export default async function Home() {
  await ensureUserExists()
  return (
    <>
      <Navbar />
      <HeroSection />
      <section className="my-25 mx-5">
        <div className="font-bold text-2xl md:text-3xl text-center">
          <h1>Featured Articles</h1>
        </div>
        <div className="text-center mb-20 ">
          <p>Discover the most popular and trending articles</p>
        </div>
    <Suspense fallback={<ArticlePageSkeleton/>}>

        <TopArticles />
    </Suspense>
        <div className="mt-12 text-center">
          <Link href="/articles">
            <Button className="hover:bg-gray-900 cursor-pointer rounded-full dark:hover:text-white ">
              View all articles
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
