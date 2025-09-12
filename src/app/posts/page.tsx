"use client";

import { PostDto } from "@/type/post";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const [posts, setPosts] = useState<PostDto[]>([]);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; //env 파일에 있는 변수 가져와서 사용용

  useEffect(() => {
    fetch(`${baseUrl}/api/v1/posts`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      });
  }, []);

  return (
    <div className="flex flex-col gap-9">
      <h1>글 목록</h1>
      {posts.length === 0 && <div>Loading...</div>}
      {posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                {post.id} : {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
//글 목록은 2번 렌더링 된다
//최초 렌더링은 글 0게
//2번째 렌더링 -> useEffect실행 -> 상태값 변경 -> 리렌더링 

//백엔드 개발자는 post에 대한 정보가 뭐가 있는지 알지만
//프론트 개발자는 모른다