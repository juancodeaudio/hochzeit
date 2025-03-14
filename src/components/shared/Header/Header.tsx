import Link from "next/link";

export const Header = () => {
  return (
    <header>
      <nav>
        <ul style={{ display: "flex", gap: "1rem" }}>
          <Link href="/">Home</Link>
          <Link href="/story">Historia</Link>
          <Link href="/gallery">Galeria</Link>
          <Link href="/party">Sobre la fiesta</Link>
          <Link href="/faq">FAQ</Link>
        </ul>
      </nav>
    </header>
  );
}