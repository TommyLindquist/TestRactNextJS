export default function DataError({ message="", error="" }: { message: string, error?: string }) {
  return (
    <div className="border border-red-500 bg-red-100 text-red-700 p-4 rounded">
      <h2 className="font-bold">{message ?? "A failure occurred retreiving the information."}</h2>
      <p>{error}</p>
    </div>
  );
}

