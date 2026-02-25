import formatMoney from './formatMoney';

describe('formatMoney', () => {
  it('should be able to format money', () => {
    const result = formatMoney(149.9);

    expect(result).toBe('R$ 149,90');
  });

  it('should be able to format thousands with dot separation', () => {
    const result = formatMoney(1499.9);

    expect(result).toBe('R$ 1.499,90');
  });

  it('should format 0 correctly', () => {
    const result = formatMoney(0);

    expect(result).toBe('R$ 0,00');
  });
});
