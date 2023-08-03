import { redirect } from 'next/navigation'
import { RedirectType } from 'next/dist/client/components/redirect'

export default function BillSplitting() {
  return redirect('bill-splitting/bills', RedirectType.replace)
}
