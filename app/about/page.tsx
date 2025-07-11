"use client";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen px-6 py-16 sm:px-10 md:px-20 lg:px-32 bg-background text-foreground">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold sm:text-5xl">About BlogNest</h1>
        <Link href={"/"}>
        <p className="text-lg text-muted-foreground">
          Welcome to <span className="font-semibold text-blue-600">BlogNest</span> — where ideas take flight.
        </p>
</Link>
        <p className="text-base sm:text-lg">
          At BlogNest, we believe everyone has a story worth sharing. Whether you&apos;re a writer, reader, or creative mind,
          our platform offers a clean, minimal space to express, explore, and engage.
        </p>

        <div className="text-left space-y-4 mt-10">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Empower writers to publish freely and fearlessly</li>
            <li>Help readers discover meaningful content</li>
            <li>Build a community around curiosity and creativity</li>
          </ul>
        </div>

        <div className="text-left space-y-4 mt-10">
          <h2 className="text-2xl font-semibold">Why BlogNest?</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>📝 Clean & simple editor focused on writing</li>
            <li>🌓 Light & Dark mode support</li>
            <li>🔐 Full content control — your words, your rules</li>
            <li>📚 Explore articles across various categories</li>
          </ul>
        </div>

        <p className="mt-10 text-base text-muted-foreground">
          Whether it&apos;s your first post or your hundredth, BlogNest is your space to write, share, and grow.
        </p>
      </div>
    </div>
  );
};

export default About;
