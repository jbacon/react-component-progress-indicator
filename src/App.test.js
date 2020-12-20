import { render } from '@testing-library/react';
import {unmountComponentAtNode} from 'react-dom';
import App from './App';

test('renders and unmouts App', () => {
  const div = document.createElement('div');
  render(<App />, div);
  unmountComponentAtNode(div);
});
