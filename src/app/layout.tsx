import Link from "next/link";
import "./globals.css";
import type { Metadata } from "next";
import { Control } from "./Control";

export const metadata: Metadata = {
  title: "WEB tutorials",
  description: "Generated by HOJOON",
};

interface Topic {
  id: number;
  title: string;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await fetch(process.env.API_URL + "topics", {
    next: { revalidate: 0 },
  }); //revalidata 만큼만 캐시를 유지한다.

  // const res = await fetch("http://localhost:9999/topics", {
  //   cache: "no-store",
  // });

  const topics: Topic[] = await res.json();
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
        </ol>
        {children}
        <Control></Control>
      </body>
    </html>
  );
}
