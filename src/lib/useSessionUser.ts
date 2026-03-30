"use client"

import { useEffect, useState } from "react"
import { supabaseClient } from "@/lib/supabaseClient"
import { Session } from "@supabase/supabase-js"

export function useSessionUser() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } =
      supabaseClient.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return { session, loading }
}
