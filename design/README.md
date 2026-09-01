# Design-Quellen

Grafiken für Social Media und Print, die **nicht** auf der Website landen –
Flyer, Ankündigungsbilder, Vorlagen. Bewusst außerhalb von `src/`, damit Vite
sie nicht in den Build zieht: Es sind mehrere Megabyte, die niemand ausliefert.

Bildquellen, aus denen `scripts/optimize-images.mjs` Website-Assets erzeugt
(Portraits, Logos, Vorschaubilder), gehören dagegen nach `src/assets/` – das
Skript liest von dort.

| Datei | Verwendung |
| --- | --- |
| `Design-solo-v1.png` | Ankündigung „Logos und Ekstase", Miguel Estéfano Mora Vera, 08.09.2026. Instagram-Format 4:5. |
