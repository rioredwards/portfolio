import Link from 'next/link';

export default function Page() {
  let codeCards = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <section className="cards-container mt-48 flex items-center text-6xl justify-center">
      {codeCards.map((id) => (
        <Link className="card" key={id} href={`/code/${id}`} passHref>
          {id}
        </Link>
      ))}
    </section>
  );
}
