"use client";

import { fetchApi } from "@/lib/client";
import { PostDto } from "@/type/post";
import Link from "next/link";
import { useEffect, useState } from "react";

//글 목록 페이지
export default function Home() {
  const [posts, setPosts] = useState<PostDto[]>([]);

  useEffect(() => {
    fetchApi(`/api/v1/posts`).then(setPosts);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-9">
        <h1>글 목록</h1>
        {posts === null && <div>Loading...</div>}
        {posts !== null && posts.length === 0 && <div>글이 없습니다.</div>}
        {posts !== null && posts.length > 0 && (
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
      <div>
        <Link href="/posts/write">새 글 작성</Link>
      </div>
    </>
  );
}
//글 목록은 2번 렌더링 된다
//최초 렌더링은 글 0게
//2번째 렌더링 -> useEffect실행 -> 상태값 변경 -> 리렌더링 

//백엔드 개발자는 post에 대한 정보가 뭐가 있는지 알지만
//프론트 개발자는 모른다