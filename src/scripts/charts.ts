// Interactive charts for the case studies. Plotly is loaded only when a chart scrolls into
// view, and every chart is redrawn with the site's colours when the colour scheme changes.
// Each chart container starts with a static image fallback that is hidden once the plot is drawn.

type Lang = 'en' | 'fr';
type Plotly = {
  react: (el: HTMLElement, data: unknown[], layout: unknown, config?: unknown) => Promise<unknown>;
  purge: (el: HTMLElement) => void;
};
type Series = { x: string[]; y: number[] };
type Run = { init: { t0: string; y: number[] }; real: { t0: string; y: number[] }; pred: { t0: string; y: number[] } };

const STR = {
  en: {
    price: 'Closing price (USDT)',
    phases: ['Range, sell-off', 'Consolidation', 'Recovery', 'Acceleration'],
    real: 'Actual price',
    pred: 'Model forecast',
    init: 'Initial context',
    forecast: 'forecast starts',
    median: 'Median trade size (USDT)',
    value: 'Value',
    datasets: { normal_value: 'Raw prices', log_return: 'Log-returns' },
  },
  fr: {
    price: 'Prix de clôture (USDT)',
    phases: ['Range, chute', 'Consolidation', 'Reprise', 'Accélération'],
    real: 'Prix réel',
    pred: 'Prévision du modèle',
    init: 'Contexte initial',
    forecast: 'début de la prévision',
    median: 'Taille médiane des transactions (USDT)',
    value: 'Valeur',
    datasets: { normal_value: 'Prix bruts', log_return: 'Log-rendements' },
  },
} as const;

let plotlyPromise: Promise<Plotly> | null = null;
function loadPlotly(): Promise<Plotly> {
  plotlyPromise ??= import('plotly.js-cartesian-dist-min').then((m) => (m.default ?? m) as Plotly);
  return plotlyPromise;
}

function theme() {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string) => css.getPropertyValue(name).trim();
  return {
    paper: v('--paper'),
    paper2: v('--paper-2'),
    ink: v('--ink'),
    ink2: v('--ink-2'),
    muted: v('--muted'),
    rule: v('--rule'),
    band: v('--data-band'),
    d1: v('--data-1'),
    d2: v('--data-2'),
    d3: v('--data-3'),
    serif: v('--serif'),
    mono: v('--mono'),
  };
}
type Theme = ReturnType<typeof theme>;

function baseLayout(th: Theme, extra: Record<string, unknown> = {}) {
  const axis = {
    color: th.muted,
    gridcolor: th.rule,
    linecolor: th.rule,
    zeroline: false,
    tickfont: { family: th.mono, size: 11, color: th.muted },
    title: { font: { family: th.serif, size: 12, color: th.muted } },
  };
  return {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { family: th.serif, size: 12, color: th.ink2 },
    margin: { t: 16, r: 12, b: 40, l: 60 },
    hovermode: 'x unified',
    hoverlabel: { bgcolor: th.paper, bordercolor: th.rule, font: { family: th.serif, color: th.ink, size: 12 } },
    legend: { orientation: 'h', x: 0, y: 1.02, yanchor: 'bottom', font: { size: 12 } },
    modebar: { bgcolor: 'rgba(0,0,0,0)', color: th.muted, activecolor: th.ink },
    xaxis: { ...axis, showgrid: false },
    yaxis: { ...axis },
    ...extra,
  };
}

const CONFIG = {
  displaylogo: false,
  displayModeBar: 'hover',
  responsive: true,
  scrollZoom: false,
  modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d', 'toImage', 'zoomIn2d', 'zoomOut2d'],
};

const hourly = (t0: string, n: number) => {
  const start = Date.parse(t0.replace(' ', 'T') + 'Z');
  return Array.from({ length: n }, (_, i) => new Date(start + i * 3_600_000).toISOString().slice(0, 16));
};

function readData<T>(el: HTMLElement): T {
  const node = el.querySelector<HTMLScriptElement>('script[type="application/json"]');
  return JSON.parse(node?.textContent ?? 'null') as T;
}

// ---------- Chart builders: return [traces, layout] for the current theme ----------

const PHASES: [string, string][] = [
  ['2022-01-01', '2022-07-01'],
  ['2022-07-01', '2023-01-01'],
  ['2023-01-01', '2024-01-01'],
  ['2024-01-01', '2025-10-31'],
];

function price(el: HTMLElement, lang: Lang, th: Theme): [unknown[], unknown] {
  const d = readData<Series>(el);
  const s = STR[lang];
  const shapes = PHASES.map(([x0, x1], i) => ({
    type: 'rect',
    xref: 'x',
    yref: 'paper',
    x0,
    x1,
    y0: 0,
    y1: 1,
    line: { width: 0 },
    fillcolor: i % 2 === 0 ? th.band : 'rgba(0,0,0,0)',
    layer: 'below',
  }));
  const annotations = PHASES.map(([x0, x1], i) => ({
    xref: 'x',
    yref: 'paper',
    x: new Date((Date.parse(x0) + Date.parse(x1)) / 2).toISOString().slice(0, 10),
    y: 1,
    yanchor: 'top',
    text: `<b>${i + 1}</b>`,
    hovertext: s.phases[i],
    showarrow: false,
    font: { family: th.serif, size: 11, color: th.muted },
  }));
  return [
    [{ type: 'scatter', mode: 'lines', x: d.x, y: d.y, name: s.price, line: { color: th.d1, width: 1.6 }, hovertemplate: '%{y:,.0f} USDT<extra></extra>' }],
    baseLayout(th, {
      shapes,
      annotations,
      showlegend: false,
      margin: { t: 28, r: 12, b: 36, l: 64 },
      yaxis: { ...baseLayout(th).yaxis, title: { text: s.price, font: { family: th.serif, size: 12, color: th.muted } }, tickformat: ',.0f' },
    }),
  ];
}

function heatmap(el: HTMLElement, lang: Lang, th: Theme): [unknown[], unknown] {
  const d = readData<{ x: string[]; y: string[]; z: (number | null)[][] }>(el);
  const months = lang === 'fr' ? ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'] : d.x;
  const fmt = (v: number | null) => (v == null ? '' : v.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-GB'));
  return [
    [
      {
        type: 'heatmap',
        x: months,
        y: d.y,
        z: d.z,
        text: d.z.map((row) => row.map(fmt)),
        texttemplate: '%{text}',
        textfont: { family: th.mono, size: 11 },
        colorscale: [
          [0, th.paper2],
          [1, th.d1],
        ],
        xgap: 2,
        ygap: 2,
        hoverongaps: false,
        colorbar: { thickness: 10, outlinewidth: 0, len: 0.8, y: 0, yanchor: 'bottom', tickfont: { family: th.mono, size: 10, color: th.muted }, title: { text: '' } },
        hovertemplate: `%{x} %{y}<br>${STR[lang].median}: %{z:,.0f}<extra></extra>`,
      },
    ],
    baseLayout(th, {
      hovermode: 'closest',
      margin: { t: 8, r: 8, b: 36, l: 48 },
      xaxis: { ...baseLayout(th).xaxis, side: 'bottom', showline: false },
      yaxis: { ...baseLayout(th).yaxis, autorange: 'reversed', type: 'category', showgrid: false, showline: false },
    }),
  ];
}

function walkforward(el: HTMLElement, lang: Lang, th: Theme): [unknown[], unknown] {
  const d = readData<Record<string, Series>>(el);
  const s = STR[lang];
  const init = d['Initial sequence'];
  const line = (series: Series, name: string, color: string, width: number) => ({
    type: 'scatter',
    mode: 'lines',
    x: series.x,
    y: series.y,
    name,
    line: { color, width },
    hovertemplate: '%{y:,.0f}',
  });
  const start = init.x[init.x.length - 1];
  return [
    [line(init, s.init, th.d3, 2), line(d['Real values'], s.real, th.d1, 1.6), line(d['Predictions'], s.pred, th.d2, 2.2)],
    baseLayout(th, {
      shapes: [{ type: 'line', xref: 'x', yref: 'paper', x0: start, x1: start, y0: 0, y1: 1, line: { color: th.muted, width: 1, dash: 'dot' } }],
      annotations: [{ xref: 'x', yref: 'paper', x: start, y: 0.02, xanchor: 'left', text: ` ${s.forecast}`, showarrow: false, font: { size: 11, color: th.muted } }],
      yaxis: { ...baseLayout(th).yaxis, tickformat: ',.0f', title: { text: 'USDT', font: { family: th.serif, size: 12, color: th.muted } } },
    }),
  ];
}

async function grid(el: HTMLElement, lang: Lang, th: Theme): Promise<[unknown[], unknown]> {
  const form = el.closest('figure')?.querySelector<HTMLFormElement>('form.grid-controls');
  const sel = (name: string) => form?.querySelector<HTMLSelectElement>(`[name="${name}"]`)?.value ?? '';
  const dataset = sel('dataset');
  const model = sel('model');
  const param = sel('param');
  const url = `${el.dataset.base}${dataset}__${model}__${param}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  const { values, runs } = (await res.json()) as { values: string[]; runs: Run[] };
  const s = STR[lang];

  const narrow = (el.parentElement ?? el).clientWidth < 560;
  const cols = narrow ? 1 : 2;
  const rows = Math.ceil(values.length / cols);
  const gapX = 0.07;
  // Vertical gap in pixels (tick labels + panel title), converted to a paper fraction
  const rowPx = narrow ? 210 : 230;
  const plotPx = rows * rowPx;
  const gapY = rows > 1 ? 58 / plotPx : 0;
  const cellW = (1 - gapX * (cols - 1)) / cols;
  const cellH = (1 - gapY * (rows - 1)) / rows;
  const label = form?.querySelector<HTMLSelectElement>('[name="param"]')?.selectedOptions[0]?.textContent ?? param;

  const traces: unknown[] = [];
  const layout: Record<string, unknown> = baseLayout(th, {
    showlegend: true,
    hovermode: 'x unified',
    margin: { t: 36, r: 8, b: 28, l: 56 },
    annotations: [],
  });
  const tickformat = dataset === 'log_return' ? '.3f' : ',.0f';

  values.forEach((value, i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const n = i === 0 ? '' : String(i + 1);
    const xa = `xaxis${n}`;
    const ya = `yaxis${n}`;
    const run = runs[i];
    const series: [keyof Run, string, string, number][] = [
      ['init', s.init, th.d3, 2],
      ['real', s.real, th.d1, 1.3],
      ['pred', s.pred, th.d2, 2],
    ];
    for (const [key, name, color, width] of series) {
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: hourly(run[key].t0, run[key].y.length),
        y: run[key].y,
        xaxis: `x${n}`,
        yaxis: `y${n}`,
        name,
        legendgroup: key,
        showlegend: i === 0,
        line: { color, width },
        hovertemplate: `%{y:${tickformat}}`,
      });
    }
    const x0 = c * (cellW + gapX);
    const y1 = 1 - r * (cellH + gapY);
    const base = baseLayout(th);
    layout[xa] = { ...base.xaxis, domain: [x0, x0 + cellW], anchor: `y${n}`, nticks: 4, tickformat: '%b %d' };
    layout[ya] = { ...base.yaxis, domain: [y1 - cellH, y1], anchor: `x${n}`, nticks: 4, tickformat, title: { text: '' } };
    (layout.annotations as unknown[]).push({
      xref: 'paper',
      yref: 'paper',
      x: x0,
      y: y1,
      xanchor: 'left',
      yanchor: 'bottom',
      text: `<b>${label}</b> = ${value}`,
      showarrow: false,
      font: { family: th.serif, size: 12, color: th.ink2 },
    });
  });

  layout.legend = { orientation: 'h', x: 0, y: 0, yanchor: 'bottom', yref: 'container', font: { size: 12 } };
  layout.margin = { t: 36, r: 8, b: narrow ? 92 : 72, l: 56 };
  layout.height = plotPx + (rows - 1) * 58 + (narrow ? 128 : 108);
  el.style.height = `${layout.height}px`;
  return [traces, layout];
}

const BUILDERS: Record<string, (el: HTMLElement, lang: Lang, th: Theme) => [unknown[], unknown] | Promise<[unknown[], unknown]>> = {
  price,
  heatmap,
  walkforward,
  grid,
};

// ---------- Lifecycle ----------

const drawn = new Set<HTMLElement>();
const requests = new WeakMap<HTMLElement, number>();

async function draw(el: HTMLElement) {
  const kind = el.dataset.chart ?? '';
  const build = BUILDERS[kind];
  if (!build) return;
  // Ignore results of an older draw that finishes after a newer one (fast control changes)
  const request = (requests.get(el) ?? 0) + 1;
  requests.set(el, request);
  const lang = (document.documentElement.lang === 'fr' ? 'fr' : 'en') as Lang;
  const figure = el.closest('.chart-figure');
  figure?.setAttribute('aria-busy', 'true');
  try {
    const [Plotly, built] = await Promise.all([loadPlotly(), build(el, lang, theme())]);
    if (requests.get(el) !== request) return;
    const [data, layout] = built;
    // The plot must be visible before drawing so Plotly can measure its width
    figure?.classList.add('is-ready');
    await Plotly.react(el, data, layout, CONFIG);
    drawn.add(el);
  } catch (err) {
    console.error(err);
    if (!drawn.has(el)) figure?.classList.remove('is-ready');
    figure?.classList.add('is-failed');
  } finally {
    figure?.removeAttribute('aria-busy');
  }
}

function init() {
  const charts = Array.from(document.querySelectorAll<HTMLElement>('[data-chart]'));
  if (!charts.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        const el = entry.target.querySelector<HTMLElement>('[data-chart]');
        if (el) void draw(el);
      }
    },
    { rootMargin: '300px 0px' },
  );
  // Observe the figure: the plot itself stays hidden (no box) until it is first drawn
  charts.forEach((el) => io.observe(el.closest('.chart-figure') ?? el));

  // Grid explorer controls redraw their chart
  document.querySelectorAll<HTMLFormElement>('form.grid-controls').forEach((form) => {
    const el = form.closest('figure')?.querySelector<HTMLElement>('[data-chart="grid"]');
    if (!el) return;
    form.addEventListener('change', () => void draw(el));
    form.addEventListener('submit', (e) => e.preventDefault());
  });

  // Recolour on light/dark switch
  const recolour = () => drawn.forEach((el) => void draw(el));
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', recolour);
  window.addEventListener('themechange', recolour);

  // The grid switches between one and two columns
  let lastNarrow: boolean | null = null;
  const grids = charts.filter((el) => el.dataset.chart === 'grid');
  if (grids.length) {
    new ResizeObserver(() => {
      const narrow = (grids[0].parentElement ?? grids[0]).clientWidth < 560;
      if (lastNarrow !== null && narrow !== lastNarrow) grids.filter((g) => drawn.has(g)).forEach((g) => void draw(g));
      lastNarrow = narrow;
    }).observe(grids[0].parentElement ?? grids[0]);
  }
}

init();
