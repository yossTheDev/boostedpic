import { Suspense } from "react"
import Image from "next/image"

import { Editor } from "@/components/editor"
import { Icons } from "@/components/icons"

export default async function IndexPage() {
  return (
    <section className="container flex h-full flex-col items-center gap-16  pb-8 md:flex-row">
      {/* Hero */}
      <div className="group top-0 mt-16 flex flex-col items-center justify-center px-1 py-6 md:sticky md:mt-0 md:px-4">
        <div className="flex flex-col items-center justify-center md:mt-0 md:w-96">
          <a
            className="mb-4 hidden w-fit p-0"
            href="https://www.producthunt.com/posts/removerized?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-removerized"
            target="_blank"
          >
            <Image
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=454170&theme=dark"
              alt="removerized - Free&#0032;AI&#0045;Powered&#0032;Background&#0032;Remover&#0032;Tool | Product Hunt"
              style={{ width: "170px", height: "34px" }}
              width="170"
              height="34"
            />
          </a>

          <h1 className="w-80 animate-fade-in-up text-center text-4xl font-bold md:text-start md:text-3xl lg:text-5xl">
            <span className="bg-gradient-to-br from-neutral-700 to-neutral-900 bg-clip-text text-transparent dark:from-neutral-50 dark:to-neutral-300">
              Fast Image Optimization Tool{" "}
            </span>
            <br></br>
            <span className="bg-gradient-to-br from-neutral-400 to-neutral-600 bg-clip-text text-transparent">
              For Web and Social Media
            </span>
            <span className="inline-block">
              <Icons.BxsZap className="flex text-muted-foreground group-hover:animate-tada"></Icons.BxsZap>
            </span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center">
            <p>Loading...</p>
          </div>
        }
      >
        <Editor></Editor>
      </Suspense>
    </section>
  )
}
