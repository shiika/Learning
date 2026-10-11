/* ELM Full-Stack Roadmap — state, rendering and progress persistence.
   Content lives in data.js; the look comes from the Organic design system. */
(function () {
  'use strict';

  var KEY = 'elm-roadmap-progress-v1';

  var state = {
    view: 'roadmap',
    done: loadProgress(),
    open: { 0: true },
    phase: 'All',
    cost: 'All'
  };

  var main = document.getElementById('main');
  var tabsEl = document.getElementById('tabs');
  var meterFill = document.getElementById('topMeterFill');
  var meterEl = document.getElementById('topMeter');
  var pctEl = document.getElementById('topPct');

  var VIEWS = [
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'resources', label: 'Resources' },
    { id: 'stack', label: 'The stack' }
  ];

  /* ── storage ──────────────────────────────────────────────────────────── */

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state.done)); } catch (e) {}
  }

  /* ── helpers ──────────────────────────────────────────────────────────── */

  var ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) { return ESCAPES[c]; });
  }

  function stepId(phase, index) { return 'p' + phase.num + '-' + index; }

  function isFree(cost) {
    return cost.indexOf('Free') === 0 || cost.indexOf('Included') === 0;
  }

  function phaseStats(phase) {
    var done = 0;
    for (var i = 0; i < phase.steps.length; i++) {
      if (state.done[stepId(phase, i)]) done++;
    }
    return { done: done, total: phase.steps.length, complete: done === phase.steps.length };
  }

  function overall() {
    var total = 0, done = 0;
    PHASES.forEach(function (p) {
      var s = phaseStats(p);
      total += s.total;
      done += s.done;
    });
    return { done: done, total: total, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  /* ── header ───────────────────────────────────────────────────────────── */

  function renderTabs() {
    tabsEl.innerHTML = VIEWS.map(function (v) {
      var active = state.view === v.id;
      return '<button class="btn tab' + (active ? ' is-active' : '') + '"' +
        ' data-view="' + v.id + '" aria-current="' + (active ? 'page' : 'false') + '">' +
        esc(v.label) + '</button>';
    }).join('');
  }

  function renderMeter() {
    var o = overall();
    meterFill.style.width = o.pct + '%';
    pctEl.textContent = o.pct + '%';
    meterEl.setAttribute('aria-valuenow', String(o.pct));
    meterEl.setAttribute('aria-valuemin', '0');
    meterEl.setAttribute('aria-valuemax', '100');
    meterEl.setAttribute('aria-valuetext', o.done + ' of ' + o.total + ' steps done');
  }

  /* ── roadmap view ─────────────────────────────────────────────────────── */

  function renderRoadmap() {
    var o = overall();
    var next = null;
    for (var i = 0; i < PHASES.length && !next; i++) {
      if (!phaseStats(PHASES[i]).complete) next = PHASES[i];
    }
    var upNext = next
      ? 'Up next — Phase ' + next.num + ': ' + next.title
      : 'Every step ticked — full-stack ready';

    // Ring geometry: r=36 in an 84×84 box, drawn by shortening the dash.
    var circ = 2 * Math.PI * 36;
    var dashOffset = circ * (1 - o.pct / 100);

    return '' +
    '<section>' +
      '<div class="hero">' +
        '<div>' +
          '<h6 class="hero-kicker">Angular → .NET · 8 months · ~10 hrs / week</h6>' +
          '<h1>Eight phases from near-zero C# to shipping full-stack.</h1>' +
          '<p class="hero-lede">Built from a scan of the real ELM / UVP repos — 16 ABP services on .NET 9, Kafka, Keycloak, YARP, SQL Server. Tick a step and it stays ticked.</p>' +
        '</div>' +
        '<div class="card elev-sm" style="gap:var(--space-3)">' +
          '<span class="card-kicker">Your progress</span>' +
          '<div class="score">' +
            '<svg class="ring" viewBox="0 0 84 84" role="img"' +
              ' aria-label="' + o.pct + '% of steps done">' +
              '<circle class="ring-track" cx="42" cy="42" r="36"></circle>' +
              '<circle class="ring-fill" cx="42" cy="42" r="36"' +
                ' stroke-dasharray="' + circ.toFixed(2) + '"' +
                ' stroke-dashoffset="' + dashOffset.toFixed(2) + '"></circle>' +
              '<text class="ring-text" x="42" y="43">' + o.pct + '%</text>' +
            '</svg>' +
            '<div class="score-main">' +
              '<span class="score-num">' + o.done + '</span>' +
              '<span class="score-of text-muted">of ' + o.total + ' steps done</span>' +
            '</div>' +
          '</div>' +
          '<div class="meter meter-lg"><div class="meter-fill" style="width:' + o.pct + '%"></div></div>' +
          '<div class="score-foot">' +
            '<span class="tag tag-accent-2">' + esc(upNext) + '</span>' +
            '<button class="btn btn-ghost no-print" style="font-size:12px" data-reset>Reset</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="phases">' + PHASES.map(renderPhase).join('') + '</div>' +

      '<div class="footnotes">' +
        '<div class="card">' +
          '<span class="card-kicker">Weekly rhythm · ~10 hrs</span>' +
          '<p class="card-body">~4 hrs structured learning · ~4 hrs hands-on practice · ~2 hrs reading the real ELM code. That last slice is what makes the roadmap stick — the repo is your best textbook.</p>' +
        '</div>' +
        '<div class="card">' +
          '<span class="card-kicker">Your Angular head start</span>' +
          '<p class="card-body">DI ↔ ASP.NET Core DI · decorators ↔ attributes · TS classes/generics ↔ C# · RxJS &amp; Promises ↔ async/await + Task · Angular modules ↔ ABP modules. You already consume these DTOs via <code>abp generate-proxy</code>.</p>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function renderPhase(p) {
    var s = phaseStats(p);
    var open = !!state.open[p.num];
    var dotClass = s.complete ? ' is-complete' : (s.done > 0 ? ' is-started' : '');

    return '' +
    '<div class="phase">' +
      '<div class="phase-rail">' +
        '<span class="phase-dot' + dotClass + '">' + p.num + '</span>' +
        '<span class="phase-line"></span>' +
      '</div>' +
      '<div class="card elev-sm phase-card">' +
        '<div class="phase-head">' +
          '<div class="phase-head-main">' +
            '<span class="card-kicker">Phase ' + p.num + ' · ' + esc(p.weeks) + '</span>' +
            '<h3 id="phase-' + p.num + '-title">' + esc(p.title) + '</h3>' +
            '<p class="card-body phase-blurb">' + esc(p.blurb) + '</p>' +
          '</div>' +
          '<div class="phase-head-aside">' +
            '<span class="tag tag-neutral">' + s.done + ' / ' + s.total + (s.complete ? ' ✓' : '') + '</span>' +
            '<button class="btn btn-secondary no-print" data-k="toggle-' + p.num + '"' +
              ' data-toggle-phase="' + p.num + '" aria-expanded="' + open + '"' +
              ' aria-controls="phase-' + p.num + '-body">' +
              (open ? 'Collapse' : 'Open phase') + '</button>' +
          '</div>' +
        '</div>' +

        (open ?
        '<div class="phase-body" id="phase-' + p.num + '-body">' +
          '<div class="steps">' +
            '<h6 class="text-muted">What to learn</h6>' +
            p.steps.map(function (label, i) {
              var id = stepId(p, i);
              var done = !!state.done[id];
              return '<label class="step' + (done ? ' is-done' : '') + '">' +
                '<input type="checkbox" class="step-box" data-step="' + id + '" data-k="step-' + id + '"' +
                  (done ? ' checked' : '') + '>' +
                '<span class="step-label">' + esc(label) + '</span>' +
              '</label>';
            }).join('') +
          '</div>' +
          '<div class="phase-side">' +
            '<div class="note note-practice">' +
              '<h6>Practice</h6><p>' + esc(p.practice) + '</p>' +
            '</div>' +
            '<div class="note note-milestone">' +
              '<h6>Milestone</h6><p>' + esc(p.milestone) + '</p>' +
            '</div>' +
            '<button class="btn btn-ghost no-print" style="align-self:flex-start"' +
              ' data-show-resources="' + p.num + '">Resources for this phase →</button>' +
          '</div>' +
        '</div>' : '') +
      '</div>' +
    '</div>';
  }

  /* ── resources view ───────────────────────────────────────────────────── */

  function visibleResources() {
    return RESOURCES.filter(function (r) {
      var okPhase = state.phase === 'All' || state.phase === 'Phase ' + r.phase;
      var okCost = state.cost === 'All' ||
        (state.cost === 'Free' ? isFree(r.cost) : !isFree(r.cost));
      return okPhase && okCost;
    });
  }

  function chip(label, kind, active) {
    return '<button class="btn chip' + (active ? ' is-active' : '') + '"' +
      ' data-k="chip-' + kind + '-' + label + '"' +
      ' data-filter-' + kind + '="' + esc(label) + '"' +
      ' aria-pressed="' + active + '">' + esc(label) + '</button>';
  }

  function renderResources() {
    var list = visibleResources();
    var phaseLabels = ['All'].concat(PHASES.map(function (p) { return 'Phase ' + p.num; }));
    var costLabels = ['All', 'Free', 'Paid'];

    return '' +
    '<section>' +
      '<h6 style="color:var(--color-accent)">Verified August 2026 · free and paid, ranked best-first</h6>' +
      '<h1 style="font-size:clamp(30px, 5vw, 46px);margin-bottom:var(--space-3)">Learning resources</h1>' +
      '<p class="section-lede">Udemy list prices are meaningless — courses drop to $13–25 constantly, so never pay list.</p>' +

      '<div class="strategies">' +
        '<div class="card elev-sm">' +
          '<span class="card-kicker">Strategy</span>' +
          '<div class="card-title">The $0 path</div>' +
          '<p class="card-body" style="font-size:14px">MS Learn + Dometrain’s free C# course + freeCodeCamp cert + ABP’s free tutorials &amp; DDD eBook + Confluent’s Kafka courses + Redis University. Surprisingly strong — you can reach the goal on this alone.</p>' +
          '<div class="card-meta"><span class="tag tag-accent-2">$0</span></div>' +
        '</div>' +
        '<div class="card elev-sm">' +
          '<span class="card-kicker">Strategy</span>' +
          '<div class="card-title">Books + sales</div>' +
          '<p class="card-body" style="font-size:14px">T-SQL Fundamentals (~$45) + Unit Testing Principles (~$45) + Learning DDD (~$45) + one or two Udemy courses on sale. Best value overall.</p>' +
          '<div class="card-meta"><span class="tag tag-accent">~$150</span></div>' +
        '</div>' +
        '<div class="card elev-sm">' +
          '<span class="card-kicker">Strategy</span>' +
          '<div class="card-title">One subscription</div>' +
          '<p class="card-body" style="font-size:14px">A single quarter of Dometrain Pro during Phases 4–6 covers EF Core, DDD ×2, REST APIs, testing ×2, Docker, OTel and background jobs — the densest purchase for this exact stack.</p>' +
          '<div class="card-meta"><span class="tag tag-accent">$165 / quarter</span></div>' +
        '</div>' +
      '</div>' +

      '<div class="card" style="background:var(--color-accent-100);margin-bottom:var(--space-6)">' +
        '<span class="card-kicker">Already paid for</span>' +
        '<p class="card-body" style="font-size:14px;color:var(--color-accent-900)">Your team’s ABP commercial license includes the microservice tutorial, ABP Suite/Studio docs and the priority support forum — effectively paid training you aren’t paying extra for. Ask your license admin; ABP has run promos giving customers the <em>Mastering ABP Framework</em> book free.</p>' +
      '</div>' +

      '<div class="no-print filters">' +
        '<div class="filter-row" role="group" aria-label="Filter by phase">' +
          '<span class="text-muted filter-label">Phase</span>' +
          phaseLabels.map(function (l) { return chip(l, 'phase', state.phase === l); }).join('') +
        '</div>' +
        '<div class="filter-row" role="group" aria-label="Filter by cost">' +
          '<span class="text-muted filter-label">Cost</span>' +
          costLabels.map(function (l) { return chip(l, 'cost', state.cost === l); }).join('') +
        '</div>' +
      '</div>' +

      '<p class="text-muted" style="font-size:13px" aria-live="polite">' +
        list.length + ' resource' + (list.length === 1 ? '' : 's') + '</p>' +

      (list.length
        ? '<div class="resource-grid">' + list.map(renderResource).join('') + '</div>'
        : '<p class="text-muted empty">No resources match that combination — try Cost: All.</p>') +

      '<h2 style="margin-top:var(--space-8)">Suggested purchase timing</h2>' +
      '<div class="scroll-x">' +
        '<table class="table">' +
          '<thead><tr><th>When</th><th>Buy</th><th class="buy-head-cost">Approx.</th></tr></thead>' +
          '<tbody>' + PURCHASES.map(function (b) {
            return '<tr><td class="buy-when">' + esc(b.when) + '</td>' +
              '<td>' + esc(b.what) + '</td>' +
              '<td class="buy-cost">' + esc(b.cost) + '</td></tr>';
          }).join('') + '</tbody>' +
        '</table>' +
      '</div>' +
      '<p class="text-muted" style="font-size:13px;margin-top:var(--space-3)">Everything else: use the free picks. For YARP, Polly, Redis, Hangfire, Keycloak integration and all of ABP, the free/official material is <em>better</em> than anything paid.</p>' +
    '</section>';
  }

  function renderResource(r) {
    return '' +
    '<a href="' + esc(r.url) + '" target="_blank" rel="noopener" class="card elev-sm resource">' +
      '<div class="resource-tags">' +
        '<span class="tag tag-neutral">Phase ' + r.phase + '</span>' +
        '<span class="tag ' + (isFree(r.cost) ? 'tag-accent-2' : 'tag-accent') + '">' + esc(r.cost) + '</span>' +
        '<span class="text-muted resource-topic">' + esc(r.topic) + '</span>' +
      '</div>' +
      '<div class="card-title">' + esc(r.title) + '</div>' +
      '<p class="card-body">' + esc(r.note) + '</p>' +
      '<div class="card-meta">' + esc(r.author) + '</div>' +
    '</a>';
  }

  /* ── stack view ───────────────────────────────────────────────────────── */

  function renderStack() {
    return '' +
    '<section>' +
      '<h6 style="color:var(--color-accent)">What the backend actually is</h6>' +
      '<h1 style="font-size:clamp(30px, 5vw, 46px);margin-bottom:var(--space-3)">Your target stack</h1>' +
      '<p class="section-lede">Every row below was found in the repos — 225 projects, all targeting net9.0.</p>' +

      '<div class="scroll-x stack-table">' +
        '<table class="table">' +
          '<thead><tr><th>Area</th><th>Technology in this project</th></tr></thead>' +
          '<tbody>' + STACK.map(function (s) {
            return '<tr><td class="stack-area">' + esc(s.area) + '</td><td>' + esc(s.tech) + '</td></tr>';
          }).join('') + '</tbody>' +
        '</table>' +
      '</div>' +

      '<h2>The 16 services</h2>' +
      '<p class="text-muted stack-lede">Each follows the same ABP layered layout — learn the shape once and you understand all of them.</p>' +
      '<div class="services">' + SERVICES.map(function (svc) {
        return '<span class="tag tag-accent-2">' + esc(svc) + '</span>';
      }).join('') + '</div>' +

      '<div class="stack-notes">' +
        '<div class="card elev-sm">' +
          '<span class="card-kicker">The layout of every service</span>' +
          '<pre class="tree">src/\n' +
'  *.Domain.Shared          constants, enums, localization\n' +
'  *.Domain                 entities, domain services, repo interfaces\n' +
'  *.Application.Contracts  DTOs + app service interfaces\n' +
'  *.Application            app service implementations\n' +
'  *.HttpApi                thin API controllers\n' +
'  *.HttpApi.Host           the runnable service\n' +
'  *.HttpApi.Client         typed client for other services\n' +
'  *.EntityFrameworkCore    DbContext, mappings, repositories\n' +
'  *.DbMigrator             migrations + data seeding\n' +
'test/                      Domain / Application / EFCore / TestBase</pre>' +
        '</div>' +
        '<div class="phase-side">' +
          '<div class="card callout-warn">' +
            '<span class="card-kicker">Don’t be fooled</span>' +
            '<p class="card-body">RabbitMQ sits in <code>startup-docker-images</code> but no service references a RabbitMQ package. Kafka is the real event bus — don’t invest time in RabbitMQ.</p>' +
          '</div>' +
          '<div class="card callout-skip">' +
            '<span class="card-kicker">Safe to skip entirely</span>' +
            '<div class="skips">' + SKIPS.map(function (k) {
              return '<span class="tag tag-outline">' + esc(k) + '</span>';
            }).join('') + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  /* ── render + events ──────────────────────────────────────────────────── */

  var RENDERERS = { roadmap: renderRoadmap, resources: renderResources, stack: renderStack };

  function render() {
    var active = document.activeElement;
    var focusKey = active && active.getAttribute ? active.getAttribute('data-k') : null;

    renderTabs();
    renderMeter();
    main.innerHTML = RENDERERS[state.view]();

    if (focusKey) {
      var next = main.querySelector('[data-k="' + focusKey + '"]');
      if (next) next.focus();
    }
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-view], [data-toggle-phase], [data-reset], ' +
      '[data-show-resources], [data-filter-phase], [data-filter-cost]');
    if (!el) return;

    if (el.hasAttribute('data-view')) {
      state.view = el.getAttribute('data-view');
      render();
      window.scrollTo(0, 0);
    } else if (el.hasAttribute('data-toggle-phase')) {
      var num = el.getAttribute('data-toggle-phase');
      state.open[num] = !state.open[num];
      render();
    } else if (el.hasAttribute('data-reset')) {
      state.done = {};
      persist();
      render();
    } else if (el.hasAttribute('data-show-resources')) {
      state.view = 'resources';
      state.phase = 'Phase ' + el.getAttribute('data-show-resources');
      render();
      window.scrollTo(0, 0);
    } else if (el.hasAttribute('data-filter-phase')) {
      state.phase = el.getAttribute('data-filter-phase');
      render();
    } else if (el.hasAttribute('data-filter-cost')) {
      state.cost = el.getAttribute('data-filter-cost');
      render();
    }
  });

  document.addEventListener('change', function (e) {
    var box = e.target.closest('[data-step]');
    if (!box) return;
    var id = box.getAttribute('data-step');
    if (state.done[id]) delete state.done[id]; else state.done[id] = true;
    persist();
    render();
  });

  render();
})();
