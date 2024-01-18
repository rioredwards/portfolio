export default function CodePage({ params: { slug } }: { params: { slug: string } }) {
  console.log(slug);

  return (
    <div className="text-5xl mt-72 flex items-center h-52 justify-center text-red-500 font-black">
      {slug}
    </div>
  );
}
