export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-12 py-4">
      © {year} Williams Onuaguluchi. All rights reserved.
    </footer>
  );
}
