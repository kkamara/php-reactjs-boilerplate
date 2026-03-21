import React from "react"

export default function Error({ error, }) {
  if (!error || "Token not set." === error) {
    return null
  }

  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      {error}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  )
}
