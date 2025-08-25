export function createPageUrl(name) {
  const map = {
    Home: '/',
    Players: '/partners',
    Courts: '/courts',
    Matches: '/matches',
    Booking: '/booking',
    Profile: '/profile',
    SignIn: '/signin'
  }
  return map[name] || '/'
}
