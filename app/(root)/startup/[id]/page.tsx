import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from 'markdown-it';
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const md = markdownit();


const page = async ({ params }: { params: Promise<{ id: string }> }) => {

    const id = (await params).id;

    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

    if (!post) return notFound();

    const parsedContent = md.render(post?.pitch || "");

    return (
        <>
            <section className="pink_container !min-h-[230px]]">
                <p className="tag">{formatDate(post?._createdAt)}</p>
                <h1 className="heading">{post.title}</h1>
                <p className="sub-heading !max-w-5xl"> {post.description} </p>
            </section>

            <section className="section_container">

                <div className="spcae-y-5 mt-10 max-w-4xl mx-auto">
                    <img
                        src={post.image}
                        alt="thumbnail"
                        className="w-[1280] h-[720] rounded-xl mb-5"
                    />

                    <hr className="divider" />

                    <div className="flex-between gap-5">
                        <Link
                            href={`/user/${post.author?._id}`}
                            className="flex gap-2 items-center mb-3"
                        >
                            <img
                                src={post.author.img}
                                alt="avatar"
                                width={64}
                                height={64}
                                className="rounded-full drop-shadow-lg"
                            />

                            <div>
                                <p className="text-20-medium"> {post.author.name} </p>
                                <p className="text-16-medium !text-black-300"> @{post.author.username} </p>
                            </div>
                        </Link>

                        <p className="category-tag"> {post.category} </p>

                    </div>

                    <hr className="divider" />

                    <h3 className="tag text-30-bold mb-8">
                        StartUp Details
                    </h3>

                    {parsedContent ? (
                        <article
                            className="prose max-w-4xl font-work-sans break-all"
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    )
                        :
                        (
                            <p className="no-result">No details found</p>
                        )
                    }
                </div>

                <hr className="divider" />

                {/* TO-DO : Recommended Startups based on your current browsing */}

                <Suspense fallback={ <Skeleton className="view_skeleton" /> }>
                    <View id={id}/>
                </Suspense>
            </section>
        </>
    )
}

export default page