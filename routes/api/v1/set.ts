import { HandlerContext } from "$fresh/server.ts";
import { rgbToHex } from "../../../utils/color.ts";

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const command = new Deno.Command("sudo", { args: ["/opt/alienware-cli", "-lj"]});

  const { code, stdout, stderr } = await command.output();

  console.assert(code === 0);
  const json = new TextDecoder().decode(stdout);

  // looks something like {"leds":{"exists":true,"left":{"red":0,"green":15,"blue":0},"head":{"red":0,"green":15,"blue":0}}}

  const data = JSON.parse(json);

  // convert to hex (head and left will always be the same)
  const hex = rgbToHex([data.leds.head.red, data.leds.head.green, data.leds.head.blue]);

  return new Response(hex, { status: 200 });
}