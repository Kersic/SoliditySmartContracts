import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

export default function ActiveLink({children, linkClass, activeLinkClass, ...props}) {

    const { pathname } = useRouter()

    let className = linkClass || ''
    if (pathname === props.href) {
        className = `${activeLinkClass ? activeLinkClass : "text-indigo-600"} ${className}`
      }

  return (
    <Link {...props}>
      <div className={`${className} cursor-pointer`}>
      {children}
      </div>
    </Link>
  )
}