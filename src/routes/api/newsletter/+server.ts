import { validate } from 'deep-email-validator';
import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from '@sveltejs/kit';

const LANGUAGES = ['pt', 'en'];

const LANGUAGE_GROUPS = new Map([
  ['pt', '80386612044760880'],
  ['en', '80392877986809440']
]);

const createSubscriber = async (email: string, groups: string[] = []) => {
  const resp = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${env.MAILERLITE_API_TOKEN}`
    },
    body: JSON.stringify({
      email,
      groups
    })
  });
  const data = await resp.json();

  if (!resp.ok) throw error(resp.status, data.message);
  return data.data;
};

const requestHistory = new Map<string, Date>();

const isRateLimited = (ip: string, cooldown = 5000) => {
  const lastRequest = requestHistory.get(ip);
  const now = new Date();

  if (!lastRequest || now.getTime() - lastRequest.getTime() > cooldown) {
    requestHistory.set(ip, now);
    return false;
  }

  return true;
};

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  const body = await request.json();
  if (!body.email) throw error(400, 'Informe um e-mail válido');
  if (!body.language) throw error(400, 'Informe o idioma da newsletter');
  if (!LANGUAGES.includes(body.language)) throw error(400, 'Informe um idioma válido');

  const ip = getClientAddress();
  if (isRateLimited(ip)) throw error(429);

  const emailValidation = await validate({
    email: body.email,
    validateTypo: false,
    validateSMTP: false
  });
  if (!emailValidation.valid) throw error(400, emailValidation.reason);

  const languageGroup = LANGUAGE_GROUPS.get(body.language);
  const groups = languageGroup ? [languageGroup] : [];

  const subscriber = await createSubscriber(body.email, groups);
  if (!subscriber) throw error(500, 'Não foi possível cadastrar na newsletter');

  return json(null);
};
