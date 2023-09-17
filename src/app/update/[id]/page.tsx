"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function Update() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  const changeTitle = (e: string) => {
    setTitle(e.target.value);
  };

  const changeBody = (e: string) => {
    setBody(e.target.value);
  };

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch("http://localhost:9999/topics/" + id)
      .then((res) => res.json())
      .then((res) => {
        setTitle(res.title);
        setBody(res.body);
      });
  }, []);
  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        console.log(e.target);
        e.preventDefault();

        const title = titleRef.current?.value || "";
        const body = bodyRef.current?.value || "";

        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch("http://localhost:9999/topics/" + id, options)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            const lastid = result.id;
            router.refresh();
            router.push(`/read/${lastid}`);
          });
      }}
    >
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          ref={titleRef}
          value={title}
          onChange={changeTitle}
          // onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          ref={bodyRef}
          value={body}
          onChange={changeBody}
          // onChange={(e) => changeBody(e.target.value)}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
