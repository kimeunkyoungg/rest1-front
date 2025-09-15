"use client";

import { fetchApi } from "@/lib/client";
import { useRouter } from "next/navigation";

//새 글 작성 페이지
export default function Home() {
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = e.target;

    const titleInput = form.title;
    const contentText = form.content;

    if (titleInput.value.length === 0) {
      alert("제목을 입력해주세요.");
      titleInput.focus();
    }

    if (contentText.value.length === 0) {
      alert("내용을 입력해주세요.");
      contentText.focus();
    }

    fetchApi(`/api/v1/posts`, {
      method: "POST",
      body: JSON.stringify({
        title: titleInput.value,
        content: contentText.value,
      }),
    }).then((data) => {
      alert(data.msg);
      router.replace(`/posts/${data.data.postDto.id}`);
    });
  };
  
      //client.js를 수정해서 위의 코드를 사용하게 됨됨
    //   fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       title: titleInput.value,
    //       content: contentText.value,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       alert(data.msg);
    //     });
    // };push //글 작성 후 url 이동. but 뒤로 가기 누르면 다시 글쓰기임(history가 남아있음)
    //이를 해결하기  위해 router.replace로 목록가기로 함함
  
    return (
        <>
          <h1 className="text-center">새 글 작성</h1>
          <form className="flex flex-col gap-2 p-2" onSubmit={handleSubmit}>
            <input
              className="border border-gray-300 rounded p-2"
              type="text"
              name="title"
              placeholder="제목"
            />
            <textarea
              className="border border-gray-300 rounded p-2"
              name="content"
              placeholder="내용"
            />
            <button className="bg-blue-500 text-white p-2 rounded" type="submit">
              저장
            </button>
          </form>
        </>
      );
  }