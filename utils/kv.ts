import type { RGB } from "./color.ts";

const kv = await Deno.openKv();

export const getColor = async (): Promise<RGB> => {
  const res = await kv.get<RGB>(["color"]);
  if (!res.value) {
    return [15, 15, 15];
  }

  return res.value;
}

export const setColor = async (color: RGB): Promise<void> => {
  await kv.set(["color"], color);
}