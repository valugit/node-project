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

const createNavLinks = title => {
  const isAuthenticated = !!localStorage.getItem('token')
  let nav = document.getElementById('app-nav')
  let pages = [
    { name: 'SquarePaint', path: '/paint' },
    { name: 'CinemArchive', path: '/cinema' },
  ]
  if (isAuthenticated) {
    const logout = document.createElement('button')
    logout.className = 'logout'
    logout.innerHTML = 'Logout'
    logout.addEventListener('click', () => {
      localStorage.removeItem('token')
      window.location.pathname = '/login'
    })
    nav.appendChild(logout)

    for (let i = 0; i < pages.length; i++) {
      const link = document.createElement('a')
      link.href = pages[i].path
      link.className = 'nav-link'
      title === pages[i].name ? link.classList.add('active') : null
      link.innerHTML = pages[i].name
      nav.appendChild(link)
    }
  } else {
    const login = document.createElement('a')
    login.href = '/login'
    login.className = 'nav-link'
    title === 'Login' ? login.classList.add('active') : null
    login.innerHTML = 'Login'
    nav.appendChild(login)

    const register = document.createElement('a')
    register.href = '/register'
    register.className = 'nav-link'
    title === 'Register' ? register.classList.add('active') : null
    register.innerHTML = 'Register'
    nav.appendChild(register)
  }
}