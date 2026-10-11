# Графика прототипа

Создана встроенным image_gen, исходные запросы ниже. Атлас: assets/town-atlas.png; поверхности: assets/terrain.png. Оригиналы сохранены в ~/.codex/generated_images.

## Атлас

Use case: stylized-concept. Asset type: production 2D game sprite atlas for a cozy town builder with tower defense. Generate ONE transparent PNG atlas, exactly a regular 4 columns by 4 rows grid of equal square cells, 1024x1024 overall. Each object entirely contained in its own 256x256 cell, centered, feet/base aligned near bottom with generous transparent margins, NO cell borders NO labels NO text. Art style inspired by simple hand-painted mobile fantasy game: chunky charming shapes, muted olive green, cream plaster, ochre terracotta roofs, teal water, soft warm sunlight from upper left, orthographic elevated front view (not diamond isometric), visible front wall and roof, little detail, no dark outlines. Consistent scale. Row 1 left to right: small cream cottage orange roof; upgraded two-storey cottage orange roof; wealthy cream townhouse with teal roof; stone well with wooden roof and blue water. Row 2: market stall with striped ochre canopy and vegetables; wheat farm plot golden wheat with tiny barn; fishing hut with nets and teal boat; potter workshop with pottery and terracotta chimney. Row 3: wooden archer defense tower with tiny teal banner; stone defense tower with teal banner; broad leafy rounded tree; triangular pine tree. Row 4: tiny villager cream clothes ochre hat; cute round teal slime monster; stocky purple horned stone monster; town hall with orange roof and teal flag. These are isolated reusable game sprites, not a screenshot. Transparent background actual alpha. No ground plane beyond compact contact shadow under each sprite.

## Поверхности

Use case: stylized-concept. Asset type: seamless 2D terrain texture atlas for a cozy hand-painted town builder. ONE square image containing exactly a 2x2 grid of equal square textures without borders or gaps. Top left: muted sage olive meadow grass, tiny subtle brush strokes, mostly uniform flat midtone, no bushes flowers objects shadows. Top right: warm ochre packed earth road texture, softly mottled, no stones larger than speckles. Bottom left: calm desaturated teal river water, tiny very soft ripples, no banks no boats. Bottom right: pale sandy beige soil, understated grain. Strict top-down view flat diffuse lighting. Each quadrant should tile seamlessly on its own. Low contrast, restrained painterly handmade style, no text, no illustration scene, no perspective, no transparency. Designed as background for cream plaster orange roof town sprites.

## Последующая анимация

Атлас содержит 16 независимо адресуемых спрайтов. Порядок: дом 1, дом 2, дом 3, колодец; рынок, ферма, рыбалка, гончарная; башня 1, башня 2, дерево, ель; житель, слизень, голем, ратуша. В игровом коде кадры определяются по фактическим размерам изображения, без предположения о 1024px.

Статика уже отделена от симуляции. Для настоящей покадровой анимации понадобятся отдельные направленные walk/idle/attack/hit/destroy sheets с фиксированными pivot, масштабом и освещением. Текущий атлас сам по себе не содержит эти кадры. Сейчас движение жителей, покачивание монстров и снаряды анимируются программно.

Новая графика должна сохранять вид сверху под углом, освещение сверху слева, терракотовые и бирюзовые акценты, прозрачный фон и опорную точку у основания. Башни впоследствии разделить на основание и вращающуюся часть, мастерские на здание и эффекты, деревья на ствол и крону. Финальную более простую стилистику можно приблизить к исходным референсам: текущий атлас детальнее.
