
export function url(path) {
  if (path[0] === "/") {
    return `${path}`
  }
  return `/${path}`
}
