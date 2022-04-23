import { ConnectStringPipe } from './connect-string.pipe';

describe('ConnectStringPipe', () => {
  it('create an instance', () => {
    const pipe = new ConnectStringPipe();
    expect(pipe).toBeTruthy();
  });
});
