import { createFileRoute, Outlet } from "@tanstack/react-router" 
import { userQueryOption } from "@/lib/api"
// src/routes/_authenticated.tsx

const Login = () => {
  return (
    <div>
      Kamu dapat login di &nbsp;
      <a href="/api/login">Login</a>
    </div>
  )
}

const Component = () => {

  const {user} = Route.useRouteContext();
  if (!user) {
    return <Login />
  }
  // console.log(user)
  return <Outlet />
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({context}) => {
    const queryClient = context.queryClient

    try {
      const data = await queryClient.fetchQuery(userQueryOption)
      return data
    } catch (error) {
      return { user : null}
    }
    // // userQueryOption
    // return {user: {name: "test"}}
  },
  component: Component
})
