const authenticate = () => {
  const token = localStorage.getItem('token')
  const authorizedAnonymousRoutes = ['/login', '/register']

  if (!token && !(authorizedAnonymousRoutes.includes(window.location.pathname) || window.location.pathname === '/'))
    window.location.pathname = '/login'
  else if (token && authorizedAnonymousRoutes.includes(window.location.pathname))
    window.location.pathname = '/'
  else return
}

const loadAuthorizationHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` })

const logout = () => {
  localStorage.removeItem('token')
  window.location.pathname = '/login'
}