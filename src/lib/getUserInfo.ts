"use client"

import { useEffect, useState } from "react"
import { supabaseClient } from "@/lib/supabaseClient"

export function getUserInfo() {
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession()

      if (!session) {
        setLoading(false)
        return
      }
      const userId = session.user.id

      const { data: profile, error } = await supabaseClient
        .from("user_profiles")
        .select("username")
        .eq("id", userId)
        .single()

      if (error) {
        console.error("Profile error:", error)
      } else {
        setUsername(profile.username)
      }

      setLoading(false)
    }

    loadUser()

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      async (_event, session) => {
        if (!session) {
          setUsername(null)
          return
        }

        const userId = session.user.id

        const { data: profile } = await supabaseClient
          .from("user_profiles")
          .select("username")
          .eq("id", userId)
          .single()

        setUsername(profile?.username ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return { username,loading }
}
