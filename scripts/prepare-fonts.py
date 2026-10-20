"""Asset preparation only. Built files in src/assets/fonts are checked in.
Run with fonttools and brotli installed. This does not modify page content.
"""
from pathlib import Path
import sys
sys.path.insert(0, str(Path('.tools').resolve()))
from fontTools.ttLib import TTFont
from fontTools import subset

root = Path('src/assets/fonts')
fonts = [('dm-sans-regular', 'DM Sans', 'normal', 400),
         ('dm-sans-semibold', 'DM Sans', 'normal', 600),
         ('instrument-serif', 'Instrument Serif', 'normal', 400),
         ('instrument-serif-italic', 'Instrument Serif', 'italic', 400)]
css = []
for filename, family, style, weight in fonts:
    font = TTFont(root / (filename + '.ttf'))
    options = subset.Options()
    options.flavor = 'woff2'
    options.layout_features = ['*']
    sub = subset.Subsetter(options=options)
    sub.populate(unicodes=list(range(0x20, 0x250)) + list(range(0x1E00, 0x1F00)) + list(range(0x2000, 0x2070)) + list(range(0x20A0, 0x20D0)))
    sub.subset(font)
    font.flavor = 'woff2'
    font.save(root / (filename + '.woff2'))
    css.append(f"@font-face{{font-family:'{family}';font-style:{style};font-weight:{weight};font-display:swap;src:url('/assets/fonts/{filename}.woff2') format('woff2');}}")

# Generate fallback metrics from the actual fonts, using x-height matching.
for target, fallback_file, local_name, fallback_name in [
    ('dm-sans-regular', 'C:/Windows/Fonts/arial.ttf', 'Arial', 'DM Fallback'),
    ('instrument-serif', 'C:/Windows/Fonts/georgia.ttf', 'Georgia', 'Instrument Fallback')]:
    f = TTFont(root / (target + '.ttf'))
    b = TTFont(fallback_file)
    def xheight(font):
        units = font['head'].unitsPerEm
        if hasattr(font['OS/2'], 'sxHeight') and font['OS/2'].sxHeight:
            return font['OS/2'].sxHeight / units
        glyph = font['glyf'][font.getBestCmap()[ord('x')]]
        return glyph.yMax / units
    adjust = xheight(f) / xheight(b)
    units = f['head'].unitsPerEm
    ascent = f['hhea'].ascent / units / adjust * 100
    descent = abs(f['hhea'].descent) / units / adjust * 100
    gap = f['hhea'].lineGap / units / adjust * 100
    css.append(f"@font-face{{font-family:'{fallback_name}';src:local('{local_name}');size-adjust:{adjust * 100:.3f}%;ascent-override:{ascent:.3f}%;descent-override:{descent:.3f}%;line-gap-override:{gap:.3f}%;}}")
Path('src/assets/fonts.css').write_text('\n'.join(css), encoding='utf-8')
print('Four Latin/Central-European WOFF2 subsets and measured fallbacks generated.')
