export const GET = async ({ request }) => {
  const url = new URL(request.url);
  const date = url.searchParams.get('date');
  // const date = new Date().toISOString().split('T')[0];
  // console.log(date)


  const res = await fetch(`https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${date}&endDate=${date}`)
  const today = await res.json()

  return new Response(JSON.stringify(today), { status: 200 })
}
