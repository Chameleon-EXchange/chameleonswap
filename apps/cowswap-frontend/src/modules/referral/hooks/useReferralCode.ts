import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

export function useReferralCode() {
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const code = params.get('ref')
    setReferralCode(code)
  }, [location.search])

  return referralCode
}
