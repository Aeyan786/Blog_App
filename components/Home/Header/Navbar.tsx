"use client";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { Button } from "../../ui/button";
import SearchInupt from "./SearchInupt";
import ToggleMode from "../ToggleMode";
import { Menu, X } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
 

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl">
              <span className="bg-gradient-to-r from-purple-600 to bg-indigo-600 dark:from-purple-400  dark:to-indigo-400 bg-clip-text text-transparent">
                Blog
              </span>
              <span className="text-foreground">Nest</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/articles"
              className="text-sm font-medium hover:text-primary"
            >
              Articles
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary"
            >
              About
            </Link>
            <span
              onClick={() => {
                if (isSignedIn) {
                  router.push("/dashboard");
                } else {
                  router.push("/sign-in?redirect_url=/dashboard");
                }
              }}
              className="cursor-pointer text-sm font-medium hover:text-primary"
            >
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ToggleMode />

            <div className="hidden md:flex items-center gap-4">
              <Suspense>

              <SearchInupt />
              </Suspense>

              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <Button variant={"outline"}>Login</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Signup</Button>
                </SignUpButton>
              </SignedOut>
            </div>

            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 border-t pt-4 pb-6 px-2">
            <div className="w-full">
              <SearchInupt />
            </div>

            <div className="flex flex-col gap-3 text-sm font-medium">
              <Link
                href="/articles"
                className="hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/about"
                className="hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
                <span
              onClick={() => {
                if (isSignedIn) {
                  router.push("/dashboard");
                } else {
                  router.push("/sign-in?redirect_url=/dashboard");
                }
              }}
              className="cursor-pointer text-sm font-medium hover:text-primary"
            >
              Dashboard
            </span>
            </div>

            <div className="flex flex-col gap-3">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <Button variant={"outline"}>Login</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Signup</Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
