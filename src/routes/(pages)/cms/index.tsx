import { cn, sleep } from '@/utils'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/(pages)/cms/')({
    component: CmsSitesOverviewPage,
})

function CmsSitesOverviewPage() {
    const [active, setActive] = useState(false)
    const navigate = useNavigate()

    const onClickHandler = async () => {
        setActive(true)
        await sleep(700)
        navigate({
            to: "/cms/$sites",
            params: { sites: "site-a-tw" },
            viewTransition: true
        })
    }

    return (
        // <ViewTransition name={`page`} >
        <div
            data-components="cms-index-page"
            className={cn(
                "flex-1",
                "w-full",
                "h-[inherit]",
                "pt-24",
                "px-space",
                "bg-black",
                "flex",
                "justity-center",
                "align-center",
                "flex-col",
                "gap-[75px]",
                "overflow-y-auto",
                active && "duration-700 h-0  p-0  overflow-hidden ease-cool"
            )}>
            <section
                data-components="top"
                className={cn(
                    "flex",
                    "justify-between",
                    "items-center"
                )}>

                <h2
                    data-components="title"
                    className={cn(
                        "text-white",
                        "text-[clamp(8rem,50vw,6vw)]",
                        "font-medium",
                        "uppercase",
                        "leading-[0.8]"
                    )}
                >
                    Sites Guide
                </h2>

                <div
                    data-components="categories"
                    className={cn(
                        "text-white",
                        "flex",
                        "flex-col",
                        "items-end",
                        "gap-1.5"
                    )}>
                    <div>Categories</div>
                    <div>Official Site</div>
                    <div>Products Site</div>
                    <div>Brands Site</div>
                    <div>Events Site</div>
                </div>
            </section>

            <section
                data-components="sitseList"
                className={cn(
                    "h-fit",
                    "grid",
                    "grid-cols-[repeat(auto-fill,minmax(400px,1fr))]",
                    "gap-[65px_50px]"
                )}>

                {[...Array(10)].map((site, index) => <div
                    key={index}
                    data-components="site"
                    className={cn(
                        "flex",
                        "flex-col",
                        "justify-center",
                        "items-start",
                        "gap-[10px]",
                        "rounded-[5px]"
                    )}
                    onMouseDown={onClickHandler}
                >
                    <div
                        data-components="siteCover"
                        className={cn(
                            "w-full",
                            "h-auto",
                            "rounded-[5px]",
                            "bg-[#1f1f1f]",
                            "cursor-pointer",
                            "aspect-[16/9]"
                        )}
                    />
                    <span className="text-white">official-zhtw</span>
                </div>
                )}
            </section>
        </div >
        // </ViewTransition >
    )
}
