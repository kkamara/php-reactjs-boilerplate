import React from "react"

export default function NotFoundComponent() {
  return (
    <div className="mt-5 col-md-4 offset-md-4">
      <h1 className="not-found-lead fw-bold">
        Oops, the page you have requested has not been found.
      </h1>
      <pre>Message: 404 Not Found.</pre>
    </div>
  )
}
