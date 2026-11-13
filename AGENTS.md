<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Static marketing site with no DB or forms; one narrow server function sends Meta conversions, and WhatsApp remains the only conversion point.
- All copy lives in `src/i18n/locales/*.ts` (one file per language, typed by pt-BR); components never hardcode text.
- Language lives in the URL (`/$lang`, slugs pt-br/pt-pt/es/en); `/` redirects client-side using saved choice or browser language.
- WhatsApp number, public measurement IDs, `[ref: …]` origin codes and content visibility flags live only in `src/config/site.ts`; the Meta access token is server-only.
- Mount GTM once in the root and load it only after an explicit analytics or advertising grant; sync each purpose independently with unanswered purposes denied, and omit the noscript iframe because it bypasses consent. Container tags must enforce their own purpose consent checks; do not duplicate the existing Meta Pixel in GTM.
- No measurement scripts load before cookie consent; per-purpose consent lives in `src/lib/consent.ts`, and Meta requires an explicit advertising grant.
- Keep section order, navigation anchors, review visibility and optional founder/video media in site configuration so all four languages share the same page structure.
- YouTube media must load only after an explicit click; use privacy-enhanced embeds and no player or thumbnail requests before that click.
- Cookie preferences reopen the existing consent banner without loading measurement scripts; Pixel and Conversions API events share one event ID for deduplication.
- Keep the security method and the security-test offer as distinct visual bands within the security section, using shared translations; this separates institutional information from the WhatsApp service offer without nested cards.
