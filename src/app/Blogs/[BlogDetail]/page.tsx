"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PortableText, PortableTextBlock } from '@portabletext/react'
import { useParams } from "next/navigation";
import { fetcher } from "@/services/api";


interface BlogData {
  blogImage: string;
  blogHeading: string;
  blogContent: PortableTextBlock[];
  blogDate: string;
  blogId: number
}


export default function BlogDetail() {
  
  const params = useParams<{ BlogDetail: string }>()
  const  {BlogDetail} = params

  
  
  const [data, setData] = useState<BlogData | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
        const res = await fetcher()
        const blog = res.find((blog: any) => blog.blogId === Number(BlogDetail))
        setData(blog)
      
        
    }

    fetchBlogs()
  }, [BlogDetail,data]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:pl-[50px] sm:pr-[100px] py-8 bg-black">
      {data && (
        <>
          <h1 className="text-5xl font-bold text-blue-400 mb-6 text-center">
            {data.blogHeading}
          </h1>
          <div className="w-full max-w-xl">
            <div className="relative">
              <Image
                src={data.blogImage} // Replace with your image path
                alt="Blog Image"
                width={600} // Image width
                height={300} // Image height
                className="w-full h-auto border-4 border-blue-500 shadow-lg"
              />
            </div>
          </div>
          {data.blogContent.map((content, index) => (
  <div
    key={index}
    className={`mt-8 w-full px-4  flex flex-col gap-2  text-white ${
      index === 0 ? "text-center hidden  text-[40px] font-bold" : ""
     } ${
      content.children && content.children[0].text === "TL;DR" ? "   text-[40px] font-bold" : ""
     }  ${content.style=="h2" ? "p-3 text-blue-900 text-[20px] font-bold bg-white text-center" : ""}`}
  >
    <PortableText value={content} />
  </div>
))}
        </>
      )}
    </div>
  );
}
