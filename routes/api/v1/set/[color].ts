import { HandlerContext } from "$fresh/server.ts";
import { hexToRgb } from "../../../../utils/color.ts";
import { setColor } from "../../../../utils/kv.ts";

export const handler = async (_req: Request, ctx: HandlerContext): Promise<Response> => {
  const { color } = ctx.params;
  const rgb = hexToRgb(color);

  if (!rgb) {
    return new Response(`Invalid color ${color}`, { status: 400 });
  }

  const command = new Deno.Command("sudo", { args: ["alienware-cli", "-H", `"${rgb.join(" ")}"`, "-L", `"${rgb.join(" ")}"`]});

  const { code } = await command.output();

  console.assert(code === 0);

  await setColor(rgb);
  return new Response(null, { status: 200 });
}