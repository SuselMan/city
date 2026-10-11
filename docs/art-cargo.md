# Растровые тележки

Создано встроенным image_gen по референсам пользователя. Атлас: assets/cargo-atlas.png, 1536×1024, сетка 3×2, прозрачный фон. Порядок: пустая тележка, зерно, рыба, дичь, глина, посуда. Камера сверху и спереди без бокового поворота.

Промпт генерации:

Raster sprite atlas for a simple cozy city builder. EXACT 3 columns by 2 rows equal square cells on genuinely transparent background. Primitive flat cartoon shapes, ochre wood, cream, muted olive, teal accents, no outlines, no textures, no realistic 3D, no roof detail. Camera ABOVE AND STRAIGHT FRONT with no sideways rotation: see top of a small wooden handcart and its front, depth recedes upward. Each sprite contains a tiny cream villager with ochre hat pushing a low wooden two-wheel handcart. Dot eyes, stubby body, simple wheels, compact cast shadow. Row1 left empty handcart; middle cart carrying 3 ochre grain sacks and tiny wheat shape; right cart carrying 3 simple teal fish. Row2 left cart carrying 3 brown game meat parcels (no gore); middle cart carrying 3 ochre clay lumps; right cart carrying 3 simple terracotta pots. Consistent silhouette, scale, lighting and base anchor for all six sprites. Each fits middle 70% of its cell with generous padding, no overlap, no borders, no letters, no labels. Must match user's supplied screenshot primitive raster art, not detailed fantasy art.

Промпт удаления фона:

Remove ALL the black/brown background and orange glow from this 3x2 cart sprite atlas. Replace background with genuinely transparent alpha, not a painted checkerboard, not black. Keep only each villager and wooden cart with its cargo. Remove broad shadows and every haze/glow so each sprite has a clean tight silhouette with completely transparent gaps between all six sprites and transparent margins. Preserve exact original pixel dimensions, 3-column 2-row layout, cart positions, sizes, colors, simple artwork, eyes and goods. Do not redraw composition. Actual alpha cutout game sprite sheet.
