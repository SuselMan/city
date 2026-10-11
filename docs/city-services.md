# Пожарные и инженеры

Пожарное депо: 100 монет, 200 прочности, 3 работника. Инженерная мастерская: 100 монет, 200 прочности, 2 работника. Обе службы требуют дорожной связи с ратушей для найма. Персонал распределяется вместе с остальными рабочими местами; неполный состав даёт меньше активных специалистов. Персонал горящего здания временно освобождается.

## Пожары

У зданий накапливается риск (начальный 8%, +0,16 процентного пункта в секунду). В пределах 14 клеток дорожного пути действующее депо с доступным колодцем снижает риск в зависимости от числа работников. Ратуша, колодец и декоративные деревья в прототипе не загораются. Новый город защищён от случайных пожаров первые 120 секунд; первое возгорание возможно на следующей проверке. Проверки раз в 60 секунд после начальной задержки 45 секунд, при наличии хотя бы четырёх пожароопасных зданий и риска от 25%. Выбирается наиболее рискованное здание; одновременно естественно возникает не больше двух очагов. Огонь перекидывается на ближайшую постройку в пределах 2,1 клетки через каждые 15 секунд, повреждает и может уничтожить здание.

Пожарные выбирают доступный по дорогам очаг до 24 клеток. Из депо идут к колодцу (до 18 клеток от депо), наполняют ведро 1,5 секунды, несут его к огню и тушат; если воды не хватает, идут за следующей порцией. Ведро является состоянием конкретного работника, а тушение действует только после прибытия. Колодец не исчерпывается (как и домашнее водоснабжение текущего прототипа). Тушение не восстанавливает прочность: после него нужен ремонт. Без работников, связи депо с ратушей или воды профилактика не действует. При потере работников активное задание приостанавливается; удаление депо удаляет его бригаду.

## Инженеры

Каждое здание кроме дерева хранит время последнего осмотра. Через 90 секунд без обхода теряет 0,16 прочности в секунду; при нуле обрушивается. Новые и старые сохранения без поля времени осмотра получают начальную отсрочку. Инженеры ходят по дорогам в пределах 24 клеток, выбирают повреждённые и давно не посещённые здания, не дублируют задания друг друга, осматривают минимум 2 секунды и ремонтируют до 8 прочности в секунду до полного восстановления. Горящие здания пропускают до тушения. Профилактика и ремонт требуют труда; расход материалов пока не введён. Свою мастерскую они тоже обслуживают.

## Графика, управление и сохранения

Огонь, персонажи с пустыми/полными вёдрами, мастерская и пожарное депо — растровые прозрачные PNG, повышенный фронтальный ракурс по исходному референсу. Состояния рабочих берутся из модели, движения/эффекты — из игрового времени. Пауза останавливает пожар, износ, ходьбу и эффекты; ускорение ускоряет их вместе с экономикой. Карточки показывают пожар, риск, защиту, время последнего обхода, воду и активные задания. Миникарта выделяет горящие постройки; сильный износ отмечается трещиной и полосой прочности. Кнопка ремонта сохранена. Строительство/снос новых служб входят в отмену действий.

Сохраняются прочность, риск/очаги, осмотры, пожарный таймер, координаты, маршруты, фазы рабочих и вода. Старые города загружаются без обнуления экономики. Нужные изображения находятся в assets/fire-v1.png и assets/engineers-v1.png, 2×2. Покадровых анимационных листов пока нет: смена рабочих фаз, покачивание, вода и дым добавлены в рендерере.

Проверки: qa/services-check.cjs (тушение, доставка воды, spread/разрушение, отсутствие воды/дорог, обход/ремонт/износ/обрушение, естественный пожар, сохранение); qa/services-browser-check.cjs (desktop + mobile Chromium, строительство и карточки через UI, растровые персонажи, огонь, ведро, пауза и перезагрузка сохранения). Это браузер с мобильным размером и touch, не проверка на настоящем телефоне.

## Промпты изображений

Встроенный image_gen, прозрачный фон, референсы: assets/hunting-v1.png и исходный скриншот Ильи. Выход скопирован в проект, предыдущие атласы сохранены.

Fire: Transparent PNG sprite atlas exact 2x2 equal square cells, matching these reference game assets. Simple chunky primitive cream ochre olive rust flat shapes, NO outlines, no texture, no realism. Camera from above and straight FRONT, zero diagonal/isometric rotation. TOP LEFT: small fire station building, cream FRONT wall, large ochre roof top receding straight upward, red bucket symbol above front open doorway, tiny wooden ladder leaning FRONT. NO side wall. TOP RIGHT: cute little firefighter with huge round head, rust red helmet, cream face tiny black eyes, olive clothes holding EMPTY wooden bucket. BOTTOM LEFT: identical firefighter carrying wooden bucket visibly filled with teal water. BOTTOM RIGHT: stylized large flame, rust orange outer tongue and creamy yellow inner tongue. All isolated centered with generous transparent padding within their cells. No ground planes, no labels or text. Same simple elevated front perspective as reference hunter sprites. Raster art, actual transparency.

Engineers: Transparent raster PNG game sprite atlas EXACT 2x2 equal square cells matching primitive muted olive ochre cream reference style. NO outlines NO texture NO realism NO isometric rotation. Elevated straight FRONT camera: see TOP and FRONT, not side. TOP LEFT engineer workshop building, cream front wall, large ochre roof receding straight upwards, simple hammer symbol above front door and stack of 3 boards. TOP RIGHT cute little engineer huge head, cream face tiny black eyes, ochre cap, olive clothes carrying small hammer. BOTTOM LEFT IDENTICAL engineer repairing with hammer raised. BOTTOM RIGHT small isolated cream stone wall with dark rust crack as damage warning icon. Center each sprite in its cell with transparent padding, no ground, no text or labels. Characters same simple proportions as reference hunter.
