import React from "react"

import "./NotFoundComponent.scss"

export default function NotFoundComponent() {
  return (
    <div>
      <h1 className="not-found-lead fw-bold">
        Oops, the page you have requested has not been found.
      </h1>
      <pre>Message: 404 Not Found.</pre>
    </div>
  )
}
