import { convert } from "html-to-text";

export const htmlToText = (html: string): string => {
  return convert(html, { wordwrap: 130 });
};
