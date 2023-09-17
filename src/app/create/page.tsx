"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

export default function Create() {
  const router = useRouter();
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        console.log(e.target);
        e.preventDefault();

        const title = titleRef.current?.value || "";
        const body = bodyRef.current?.value || "";

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(process.env.NEXT_PUBLIC_API_URL + "topics", options)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            const lastid = result.id;
            router.push(`/read/${lastid}`);
          });
      }}
    >
      <p>
        <input type="text" name="title" placeholder="title" ref={titleRef} />
      </p>
      <p>
        <textarea name="body" placeholder="body" ref={bodyRef}></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
