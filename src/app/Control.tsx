"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export function Control() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const deleteTopics = () => {
    const options = { method: "DELETE" };
    fetch("http://localhost:9999/topics/" + id, options)
      .then((res) => res.json)
      .then((res) => {
        console.log(res);
        router.refresh();
        router.push("/");
      });
  };
  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>
      {id ? (
        <>
          <li>
            <Link href={"/update/" + id}>Updata</Link>
          </li>
          <li>
            <input type="button" value="delete" onClick={deleteTopics} />
          </li>
        </>
      ) : null}
    </ul>
  );
}
