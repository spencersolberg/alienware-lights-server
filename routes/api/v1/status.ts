import { HandlerContext } from "$fresh/server.ts";

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const command = new Deno.Command("sudo", { args: ["/opt/alienware-cli", "-lj"]});

  const { code, stdout, stderr } = await command.output();

  console.assert(code === 0);
  const json = new TextDecoder().decode(stdout);

  // looks something like {"leds":{"exists":true,"left":{"red":0,"green":15,"blue":0},"head":{"red":0,"green":15,"blue":0}}}

  const data = JSON.parse(json);

  // if ANY values are non-zero (for left or head, red, green, or blue), return 1
  if (data.leds.left.red !== 0 || data.leds.left.green !== 0 || data.leds.left.blue !== 0 || data.leds.head.red !== 0 || data.leds.head.green !== 0 || data.leds.head.blue !== 0) {
    return new Response("1", { status: 200 });
  }

  // otherwise, return 0

  return new Response("0", { status: 200 });
}