import { expect, test } from "@playwright/test";
import { obtenerContenido } from "../lib/content.js";

/** Humo, no cobertura: que las dos portadas carguen, que un proyecto abra su
 *  ruta con los seis campos y que el selector de idioma conserve la ficha. Los
 *  textos salen del mismo contenido que pinta el sitio, así que la prueba no
 *  repite ninguna cadena y no hay que tocarla al reescribir contenido. */
const IDIOMAS = ["es", "en"];

test("la raíz manda al español", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/es$/);
});

for (const lang of IDIOMAS) {
  const { plano, ui } = obtenerContenido(lang);

  test(`[${lang}] la portada pinta el plano entero`, async ({ page }) => {
    await page.goto(`/${lang}`);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    for (const proyecto of plano) {
      await expect(page.locator(`a#${proyecto.slug}`)).toContainText(
        proyecto.nombre,
      );
    }
  });

  test(`[${lang}] un nodo abre su ficha con los seis campos`, async ({ page }) => {
    const [primero] = plano;
    await page.goto(`/${lang}`);
    await page.locator(`a#${primero.slug}`).click();

    await expect(page).toHaveURL(`/${lang}/plano/${primero.slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      primero.nombre,
    );

    // Las seis etiquetas, en el orden del diccionario, con su dato al lado.
    const etiquetas = Object.values(ui.plano.campos);
    await expect(page.locator("dt")).toHaveText(etiquetas);
    for (const clave of Object.keys(ui.plano.campos)) {
      await expect(page.locator("dd")).toContainText([primero[clave]]);
    }
  });
}

test("el foco entra en el encabezado de la ficha", async ({ page }) => {
  const [primero] = obtenerContenido("es").plano;
  await page.goto(`/es/plano/${primero.slug}`);
  await expect(page.locator("h1")).toBeFocused();
});

test("volver deja el foco en el nodo del que salimos", async ({ page }) => {
  const [primero] = obtenerContenido("es").plano;
  await page.goto(`/es/plano/${primero.slug}`);
  await page.getByRole("link", { name: /volver/i }).click();

  await expect(page).toHaveURL(`/es#${primero.slug}`);
  await expect(page.locator(`a#${primero.slug}`)).toBeFocused();
});

test("el selector de idioma conserva la ficha (D12)", async ({ page }) => {
  const [primero] = obtenerContenido("es").plano;
  await page.goto(`/es/plano/${primero.slug}`);
  await page.getByRole("link", { name: "English" }).click();

  await expect(page).toHaveURL(`/en/plano/${primero.slug}`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    obtenerContenido("en").plano[0].nombre,
  );
});
