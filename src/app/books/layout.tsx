export default function BooksLayout({
  children,
  form,
}: {
  children: React.ReactNode;
  form: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {form}
    </div>
  );
}
