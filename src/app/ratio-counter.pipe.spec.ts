import { RatioCounterPipe } from './ratio-counter.pipe';

describe('RatioCounterPipe', () => {
  it('create an instance', () => {
    const pipe = new RatioCounterPipe();
    expect(pipe).toBeTruthy();
  });
});
