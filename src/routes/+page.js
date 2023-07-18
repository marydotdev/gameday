export const load = ({ fetch }) => {

  const fetchToday = async () => {
    const res = await fetch('/api/getToday')
    const today = await res.json()
    return today
  }

  return {
    today: fetchToday()
  }

}
