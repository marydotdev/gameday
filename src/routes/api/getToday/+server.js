export const GET = async () => {
  const res = await fetch(`https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1`)
  // const res = await fetch(`https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2023-07-01&endDate=2023-07-01`)
  const today = await res.json()

  return new Response(JSON.stringify(today), { status: 200 })
}
