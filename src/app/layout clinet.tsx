"use client";
import Link from "next/link";
import "./globals.css";
import type { Metadata } from "next";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "WEB tutorials",
//   description: "Generated by HOJOON",
// };

interface Topic {
  id: number;
  title: string;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/topics")
      .then((res) => res.json())
      .then((res) => setTopics(res));
  }, []);
  return (
    <html>
      <body>
        <h1>
          <Link href="/">WEB</Link>
        </h1>
        <ol>
          {topics.map((topic: Topic) => (
            <li key={topic.id}>
              <Link href={`/read/${topic.id}`}>{topic.title}</Link>
            </li>
          ))}
          <li>
            <Link href="/read/1">html</Link>
          </li>
          <li>
            <Link href="/read/2">css</Link>
          </li>
        </ol>
        {children}
        <ul>
          <li>
            <a href="/create">Create</a>
          </li>
          <li>
            <a href="/update/1">Update</a>
          </li>
          <li>
            <input type="button" value="delete" />
          </li>
        </ul>
      </body>
    </html>
  );
}
