// Import the actual files
import * as calendarHeader from './calendar-header.component';
import * as colors from './colors';
import * as moduleFile from './module';

// Create a function to convert the imported module to a string
function moduleToString(mod: any): string {
  return mod.toString();
}

// Use static content for the sources
export const sources = [
  {
    filename: 'calendar-header.component.ts',
    contents: {
      raw: { default: moduleToString(calendarHeader) },
      highlighted: { default: moduleToString(calendarHeader) },
    },
  },
  {
    filename: 'colors.ts',
    contents: {
      raw: { default: moduleToString(colors) },
      highlighted: { default: moduleToString(colors) },
    },
  },
  {
    filename: 'module.ts',
    contents: {
      raw: { default: moduleToString(moduleFile) },
      highlighted: { default: moduleToString(moduleFile) },
    },
  },
];
