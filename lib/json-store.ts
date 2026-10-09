import { mkdir, readFile, rename, writeFile } from 'fs/promises';
import path from 'path';
import { getDataDir } from '@/lib/data-dir';

const queues = new Map<string, Promise<unknown>>();

/** A JSON file in DATA_DIR with serialized read-modify-write cycles. */
export function createJsonStore<T>(fileName: string, empty: () => T) {
  const file = path.join(getDataDir(), fileName);

  async function read(): Promise<T> {
    try {
      return JSON.parse(await readFile(file, 'utf8')) as T;
    } catch {
      return empty();
    }
  }

  async function write(data: T): Promise<void> {
    await mkdir(path.dirname(file), { recursive: true });
    const tmp = `${file}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(data, null, 2), 'utf8');
    await rename(tmp, file);
  }

  function update<R>(task: (data: T) => Promise<R> | R): Promise<R> {
    const previous = queues.get(file) ?? Promise.resolve();
    const run = previous.then(async () => {
      const data = await read();
      const result = await task(data);
      await write(data);
      return result;
    });
    queues.set(
      file,
      run.catch(() => undefined),
    );
    return run;
  }

  return { read, update };
}
