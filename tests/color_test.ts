import { assertEquals } from "$std/testing/asserts.ts";

import { hexToRgb, rgbToHex } from "../utils/color.ts";
import type { RGB } from "../utils/color.ts";

Deno.test("Hex to RGB", () => {
  const hex = "ffffff";
  const rgb = hexToRgb(hex);

  assertEquals(rgb, [15, 15, 15]);
});

Deno.test("RGB to Hex", () => {
  const rgb = [15, 15, 15];
  const hex = rgbToHex(rgb as RGB);

  assertEquals(hex, "ffffff");
});