import { createFileRoute } from '@tanstack/react-router'
import LoginForms from './-loginForms'
import { cn } from '@xwadex/fesd-next/shadcns'

export const Route = createFileRoute('/(auth)/login/')({
    component: LoginPage,
})

function LoginPage() {
    return (
        <div
            data-components="loginPage"
            className={cn(
                "w-full",
                "h-screen",
                "pb-[8vh]",
                "bg-white",
                "flex flex-col",
                "justify-center",
                "items-center",
                "gap-9"
            )}
        >
            <h2
                data-components="title"
                className={cn(
                    "text-[20vw]",
                    "font-semibold",
                    "leading-none",
                    "tracking-[-18px]",
                )}
            >
                BeONES
            </h2>
            <LoginForms />
        </div>
    )
}
