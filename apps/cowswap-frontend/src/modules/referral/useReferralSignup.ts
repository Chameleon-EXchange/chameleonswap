/* eslint-disable */
import { useState, useCallback } from 'react'
import http from 'utils/http'

const SYSTEM_BEARER_TOKEN =
    import.meta.env.VITE_SYSTEM_BEARER_TOKEN ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6InNMVUMxbktrVUM0TFpRb1IiLCJpYXQiOjE3NDgyMTAyMzUsImV4cCI6MTc0ODI5NjYzNX0.20pYiF6N-FK5C_CPNgYA1mnI3GweOUC4lzwe858IffI'

export function useReferralSignup() {
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'exists' | 'error'>('idle')
    const [message, setMessage] = useState<string | null>(null)

    const signup = useCallback(async (walletAddress: string, referralCode: string | null) => {
        setLoading(true)
        setStatus('idle')
        setMessage(null)
        try {
            const response = await http.post('/api/v1/trader', { walletAddress, referralCode }, {
                headers: {
                    Authorization: `Bearer ${SYSTEM_BEARER_TOKEN}`,
                },
            })
            if (response.data.message === 'Trader created successfully') {
                setStatus('success')
                setMessage('Sign up successful! Welcome to ChameleonSwap.')
            } else if (response.data.message === 'Trader already exists') {
                setStatus('exists')
                setMessage('You are already signed up!')
            } else {
                setStatus('error')
                setMessage(response.data.message || 'Unknown error')
            }
        } catch (error: any) {
            setStatus('error')
            setMessage(error?.response?.data?.message || 'Error creating user')
        } finally {
            setLoading(false)
        }
    }, [])

    return { signup, loading, status, message }
}
