import { HandlerContext } from "$fresh/server.ts";
import { getColor } from "../../../utils/kv.ts";

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const color = await getColor();
  const command = new Deno.Command("sudo", { args: ["/opt/alienware-cli", "-H", `"${color.join(" ")}"`, "-L", `"${color.join(" ")}"`]});

  const { code, stdout, stderr } = await command.output();

  console.assert(code === 0);
  
  return new Response("on", { status: 200 });
}