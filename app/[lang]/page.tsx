import { AppSelect } from '@/app/[lang]/_components/app-select'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }
  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <AppSelect name="bill-splitting" />
    </main>
  )
}
