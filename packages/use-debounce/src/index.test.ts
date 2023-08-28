import {  cleanup, act, renderHook } from '@testing-library/react';
import { useDebounce } from './index';

describe('useDebounce', () => {
    afterEach(cleanup);

    it('should trigger the debounced function after 300ms', async () => {
        const callback = jest.fn();
        const delay = 300;

        const { result } = renderHook(() => useDebounce(callback, delay));

        act(() => {
            result.current('first call');
            result.current('second call');
            result.current('third call');
        })

        await new Promise(resolve => setTimeout(resolve, delay));

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith('third call');
    });
});