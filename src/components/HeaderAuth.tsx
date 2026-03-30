"use client"
import Link from "next/link"
import { useSessionUser } from "@/lib/useSessionUser"
import LogOut from "../app/profile/LogOut"

export default function HeaderAuth() {
  const { session } = useSessionUser()

  return session ? (
    <>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/group">Group</Link>
    </>
  ) : (
    <Link href="/SignIn">Sign In</Link>
  )
}
