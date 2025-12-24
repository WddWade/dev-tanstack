import { createFileRoute } from '@tanstack/react-router'
import LoginForms from './-loginForms'

export const Route = createFileRoute('/(auth)/login/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>
        Hello "/(auth)/login/"!
        <LoginForms />
    </div>
}
