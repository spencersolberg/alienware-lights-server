import { HandlerContext } from "$fresh/server.ts";

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const command = new Deno.Command("sudo", { args: ["alienware-cli", "-H", "black", "-L", "black"]});

  const { code, stdout, stderr } = await command.output();

  console.assert(code === 0);

  return new Response("off", { status: 200 });
}