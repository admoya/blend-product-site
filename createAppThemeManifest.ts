import fs from 'fs';
import path from 'path';
export default () => {
  return {
    name: 'createAppThemeManifest',
    buildStart: () => {
      const files = fs
        .readdirSync('./static/app/themes', { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => ({
          name: dirent.name,
          backgrounds: fs
            .readdirSync(path.join(dirent.path, dirent.name), { withFileTypes: true })
            .filter((file) => file.isFile() && file.name.endsWith('.webp'))
            .map((file) => ({
              scene: file.name.replace('.webp', ''),
              location: path.join(
                `/themes/${dirent.name}/${file.name}?v=${fs.statSync(path.join(dirent.path, dirent.name, file.name)).mtimeMs.toFixed(0)}`,
              ),
            })),
        }));
      fs.writeFileSync('./static/app/themes/manifest.json', JSON.stringify(files));
    },
  };
};
