import { llmsFullTxt, llmsHeaders } from '@/lib/llms';

export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsFullTxt(), { headers: llmsHeaders });
}
