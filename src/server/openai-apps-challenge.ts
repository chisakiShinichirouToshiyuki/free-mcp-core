import type { Request, Response } from 'express';

/**
 * Domain-ownership challenge handler for the OpenAI Plugin Directory.
 *
 * The directory fetches this path unauthenticated and compares the response body
 * against the token it issued, so the body must be the bare token — no JSON
 * wrapper, no trailing newline.
 *
 * The token belongs to a single plugin draft rather than to the service, so it is
 * injected per environment. Where it is unset the endpoint 404s, which keeps local
 * and non-production deployments from advertising a challenge they cannot satisfy.
 */
export function createOpenAIAppsChallengeHandler(
  token: string | undefined,
): (req: Request, res: Response) => void {
  return (_req: Request, res: Response): void => {
    if (!token) {
      res.status(404).end();
      return;
    }
    res.type('text/plain').send(token);
  };
}
