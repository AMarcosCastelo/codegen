import fsPromise from 'fs/promises';
import fs from 'fs';
import { expect, jest } from '@jest/globals';

import { createLayersIfNotExists } from '../createLayers';

describe('#Layers - Folder Structure', () => {
  const defaultLayers = ['service', 'factory', 'repository'];
  it("should create folder if it doesn't exists", async () => {
    jest.spyOn(fsPromise, fsPromise.mkdir.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);

    await createLayersIfNotExists({ mainPath: '', layers: defaultLayers });

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fsPromise.mkdir).toHaveBeenCalledTimes(defaultLayers.length);
  });

  it('should not create folder if it exists', async () => {
    jest.spyOn(fsPromise, fsPromise.mkdir.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);

    await createLayersIfNotExists({ mainPath: '', layers: defaultLayers });

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fsPromise.mkdir).not.toHaveBeenCalled();
  });
});
