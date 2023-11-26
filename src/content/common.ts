import { z } from 'astro:content';

export const zElementType = z.enum([
  "NO_ELEMENT",
  "FIRE",
  "WATER",
  "THUNDER",
  "ICE",
  "DRAGON",
  "POISON",
  "PARALYSIS",
  "SLEEP",
  "BLAST"
])
