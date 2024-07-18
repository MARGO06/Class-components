import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { InformationPage } from 'src/views/informationPage/InformationPage';
import '@testing-library/jest-dom';

describe('InformationPage', () => {
  it('loading indicator is displayed while fetching data', async () => {
    render(
      <BrowserRouter>
        <InformationPage />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });
  });
});
