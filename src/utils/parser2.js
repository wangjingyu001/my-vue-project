
export async function get_parser() {
    const { parse } = await import('./Parser.js');
    return parse;
  }