# Растровая графика v2

По уточнению Ильи 11 октября 2026: только растр, простая стилистика исходных скриншотов. SVG не создавались. Встроенным image_gen созданы assets/town-atlas-v2.png и assets/terrain-v2.png; они подключены к игре и меню.

Сетка 4×4, порядок спрайтов и опорные точки сохранены. Полноценные покадровые анимации ещё не созданы. Для будущих walk/idle/attack sheets сохранять силуэты, масштаб, палитру и основание кадров.

## Запрос атласа

Create a raster PNG game sprite atlas. Strictly match the visual style of the two user reference screenshots: flat primitive hand-drawn 2D cartoon vector-looking shapes, extremely simple silhouettes, muted olive/mustard/cream palette, 2 or 3 solid colors per object, slightly irregular contours, NO outlines, NO gradients, NO painted textures, NO realistic materials, NO detailed architecture, NO 3D-render look, NO small decorative details. Reference house has a simple cream square wall, one brown framed teal square window, and an oversized ochre roof with two flat color planes. Reference pine has three or four scalloped stacked olive triangles, ochre light side and dark olive shadow side. Characters are tiny round-headed stubby elemental creatures with only dot eyes. Elevated FRONT view showing front and roof, not diamond isometric. Strong simple dark olive cast shadows to lower left. This should look like simple original indie game art made from filled shapes, not polished fantasy illustration.
Atlas layout EXACTLY 4 columns by 4 rows equal square cells. Whole image square. Transparent alpha background. Each sprite occupies middle 70% of its own cell, feet/base aligned at 85% of cell height. No sprites touch or overlap cells, large transparent padding. No borders labels or text. All objects centered.
Row1: extremely simple small cream cottage with ochre roof and one window; slightly taller upgraded cream house same shape with two windows; simple larger cream house with two teal windows and ochre roof; primitive stone square well with blue water NO roof.
Row2: simple market stand rectangular ochre canopy with two wooden posts and 3 colored goods blobs; small simple golden wheat patch; tiny simple fishing hut ochre roof with teal water puddle; primitive clay pottery workshop cream box ochre roof and two pots.
Row3: primitive wooden square archer tower with ochre roof and dark opening NO person; primitive cream stone tower with ochre cap and dark opening; rounded scalloped olive broadleaf tree; stacked scalloped olive pine tree.
Row4: tiny resident round cream face dot eyes ochre cap short brown legs; tiny rounded teal water elemental dot eyes stubby feet; tiny squat ochre boulder creature with dark brown feet dot eyes; simple town hall cream rectangular body ochre roof and small teal banner.
No brickwork, no tiles on roofs, no planks, no flowers, no surface texture. NO gradients. Every object should be drawable by a novice in under 15 filled shapes. Background transparent. Match screenshot references closely.

## Запрос поверхностей

A strictly flat minimalist raster 2D game terrain atlas with exactly 2x2 equal square quadrants. Top left: solid muted olive grass #777a35 with only very faint broad irregular color patches, NO grass blades no texture. Top right: solid mustard ochre dirt path #cfa83e with 3 subtle large flat irregular patches. Bottom left: flat muted teal water #579b95 with 3 spare simple curved pale teal ripple marks, no gradient. Bottom right: solid earthy olive tan #a69a50 with 3 faint irregular broad patches. Looks like primitive filled vector shapes rasterized, matching a simple indie game with flat olive trees and ochre cream houses. No photo no brush texture no grain no realism no bevel no 3D no borders no text. Whole square image. Each quadrant seamless and uniform at its edges. Palette subdued not bright. Opaque background.

