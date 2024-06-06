import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { userQueryOption } from '@/lib/api'

export const Route = createFileRoute('/_authenticated/profile')({
  component: Profile,
})



function Profile() {
  const { isPending, error, data } = useQuery(userQueryOption)

//  if (error) return 'An error has occurred: ' + error.message
  if(isPending) return "Loading"
  if(error) return "Not Logined"
  return (
  <div className="p-2">
    Hello {data.user.family_name}! &nbsp;
    <a href="/api/logout">Logout!</a>
  </div>)
}
