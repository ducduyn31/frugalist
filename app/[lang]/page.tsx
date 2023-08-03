import { AppSelect } from '@/app/[lang]/_components/app-select'

export default function Home() {
  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <AppSelect name="bill-splitting" />
    </main>
  )
}
