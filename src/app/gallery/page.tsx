import { GalleryScroll } from "app/components/gallery/GalleryScroll";

export default function Gallery() {
  return (
    <main>
      <div style={{ height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h1>Galeria</h1>
      </div>
      <GalleryScroll />
    </main>
  );
}
