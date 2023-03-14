import { DigitsCounterPipe } from './digits-counter.pipe';

describe('DigitsCounterPipe', () => {
  it('create an instance', () => {
    const pipe = new DigitsCounterPipe();
    expect(pipe).toBeTruthy();
  });
});
