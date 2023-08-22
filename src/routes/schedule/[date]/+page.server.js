/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const date = params.date;

  const fetchDate = async () => {
    const res = await fetch(`http://localhost:5173/api/getDate?date=${date}`);
    const today = await res.json();
    return today;
  };

  return {
    today: fetchDate()
  }

}
