import { SelectionEngine } from '../core/SelectionEngine';
import { DEFAULT_SETTINGS } from '../core/StorageManager';

describe('SelectionEngine', () => {
  it('should create an instance', () => {
    const settings = { ...DEFAULT_SETTINGS };
    const engine = new SelectionEngine(settings);
    expect(engine).toBeDefined();
  });
});
