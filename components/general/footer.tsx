export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-2 md:px-12 py-4 text-center flex justify-start">
      © {year} Williams Onuaguluchi. All rights reserved.
    </footer>
  );
}
