const baseUrl = '/api/newsletter';

// FIXME: error messages are not being used and not translated
export const subscribeToNewsletter = async (email: string, language: string) => {
  try {
    const resp = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify({
        email,
        language
      })
    });
    if (!resp.ok) throw Error('Não foi possível cadastrar na newsletter');
    return true;
  } catch (error: any) {
    throw Error(error.messsage || 'Erro desconhecido');
  }
};
