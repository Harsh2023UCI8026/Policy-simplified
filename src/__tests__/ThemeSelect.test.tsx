import React from 'react';
import { renderToString } from 'react-dom/server';
import { it, expect } from 'vitest';
import ThemeSelect from '../components/ThemeSelect';

it('ThemeSelect renders native select with forwarded props', () => {
  const html = renderToString(
    <ThemeSelect id="test-select" className="test-class">
      <option value="a">A</option>
      <option value="b">B</option>
    </ThemeSelect>
  );

  expect(html).toContain('<select');
  expect(html).toContain('id="test-select"');
  expect(html).toContain('test-class');
});
