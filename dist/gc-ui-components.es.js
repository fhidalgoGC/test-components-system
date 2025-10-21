import { jsx as T, jsxs as ye, Fragment as Oe } from "react/jsx-runtime";
import { createContext as Z, useState as M, useEffect as I, useContext as D, useCallback as j, useMemo as F, useRef as Y } from "react";
const xe = {
  color: {
    fg: { light: "hsl(222.2, 84%, 4.9%)", dark: "hsl(210, 40%, 98%)" },
    bg: { light: "hsl(0, 0%, 100%)", dark: "hsl(222.2, 84%, 4.9%)" },
    primary: { light: "hsl(221.2, 83.2%, 53.3%)", dark: "hsl(217.2, 91.2%, 59.8%)" },
    secondary: { light: "hsl(210, 40%, 96%)", dark: "hsl(217.2, 32.6%, 17.5%)" },
    border: { light: "hsl(214.3, 31.8%, 91.4%)", dark: "hsl(217.2, 32.6%, 17.5%)" }
  },
  radius: { sm: "0.25rem", md: "0.5rem", lg: "0.75rem" },
  spacing: { xs: "0.25rem", sm: "0.5rem", md: "0.75rem", lg: "1rem", xl: "1.25rem" }
}, we = Z({
  theme: "light",
  tokens: xe,
  toggleTheme: () => {
  }
}), Nr = ({ children: e }) => {
  const [t, r] = M("light");
  I(() => {
    const n = localStorage.getItem("theme");
    n ? r(n) : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && r("dark");
  }, []), I(() => {
    document.documentElement.classList.toggle("dark", t === "dark"), localStorage.setItem("theme", t);
  }, [t]);
  const o = () => {
    r((n) => n === "light" ? "dark" : "light");
  };
  return /* @__PURE__ */ T(we.Provider, { value: { theme: t, tokens: xe, toggleTheme: o }, children: e });
}, Re = () => D(we);
function Be() {
  return {
    theme: Re()?.theme ?? "light"
  };
}
const Ve = "Todos", Fe = "Seleccionar Todo", Ue = "Limpiar Selección", De = "No hay etiquetas disponibles", Pe = "Seleccionado", $e = "Cargando...", je = {
  all: Ve,
  select_all: Fe,
  clear_selection: Ue,
  no_tags: De,
  selected: Pe,
  loading: $e
}, qe = "All", We = "Select All", Xe = "Clear Selection", Ye = "No tags available", He = "Selected", Je = "Loading...", Ke = {
  all: qe,
  select_all: We,
  clear_selection: Xe,
  no_tags: Ye,
  selected: He,
  loading: Je
}, Ze = { es: je, en: Ke }, Qe = (e) => {
  const t = (e || "en").toLowerCase().startsWith("es") ? "es" : "en";
  return Ze[t];
}, he = (e = 1024) => typeof window > "u" ? e : window.innerWidth || e, et = () => {
  if (typeof window > "u") return "landscape";
  const { innerWidth: e, innerHeight: t } = window;
  return t >= e ? "portrait" : "landscape";
};
function tt(e, t) {
  return t ? e.replace(/\{(\w+)\}/g, (r, o) => String(t[o] ?? `{${o}}`)) : e;
}
function _e(e, t, r = "local-first") {
  return (o, n) => {
    let s;
    return r === "global-first" ? s = t?.[o] ?? e?.[o] : s = e?.[o] ?? t?.[o], tt(s ?? o, n);
  };
}
const rt = (e) => e <= 640 ? "mobile" : e <= 1024 ? "tablet" : "desktop", ot = (e, t, r, o) => {
  if (!e) return !0;
  const { allowedDevices: n, allowedOrientations: s, breakpoints: l, defaultVisibility: i = "visible" } = e;
  return n?.length && !n.includes(r) || s?.length && !s.includes(o) ? !1 : l?.length ? (l.find((u) => t >= u.minWidth && t <= u.maxWidth)?.visibility ?? i) !== "hidden" : i !== "hidden";
};
function Ae(e) {
  var t, r, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var n = e.length;
    for (t = 0; t < n; t++) e[t] && (r = Ae(e[t])) && (o && (o += " "), o += r);
  } else for (r in e) e[r] && (o && (o += " "), o += r);
  return o;
}
function nt() {
  for (var e, t, r = 0, o = "", n = arguments.length; r < n; r++) (e = arguments[r]) && (t = Ae(e)) && (o && (o += " "), o += t);
  return o;
}
const ue = "-", st = (e) => {
  const t = it(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (l) => {
      const i = l.split(ue);
      return i[0] === "" && i.length !== 1 && i.shift(), Se(i, t) || lt(l);
    },
    getConflictingClassGroupIds: (l, i) => {
      const d = r[l] || [];
      return i && o[l] ? [...d, ...o[l]] : d;
    }
  };
}, Se = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const r = e[0], o = t.nextPart.get(r), n = o ? Se(e.slice(1), o) : void 0;
  if (n)
    return n;
  if (t.validators.length === 0)
    return;
  const s = e.join(ue);
  return t.validators.find(({
    validator: l
  }) => l(s))?.classGroupId;
}, me = /^\[(.+)\]$/, lt = (e) => {
  if (me.test(e)) {
    const t = me.exec(e)[1], r = t?.substring(0, t.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}, it = (e) => {
  const {
    theme: t,
    prefix: r
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return ct(Object.entries(e.classGroups), r).forEach(([s, l]) => {
    ce(l, o, s, t);
  }), o;
}, ce = (e, t, r, o) => {
  e.forEach((n) => {
    if (typeof n == "string") {
      const s = n === "" ? t : ve(t, n);
      s.classGroupId = r;
      return;
    }
    if (typeof n == "function") {
      if (at(n)) {
        ce(n(o), t, r, o);
        return;
      }
      t.validators.push({
        validator: n,
        classGroupId: r
      });
      return;
    }
    Object.entries(n).forEach(([s, l]) => {
      ce(l, ve(t, s), r, o);
    });
  });
}, ve = (e, t) => {
  let r = e;
  return t.split(ue).forEach((o) => {
    r.nextPart.has(o) || r.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(o);
  }), r;
}, at = (e) => e.isThemeGetter, ct = (e, t) => t ? e.map(([r, o]) => {
  const n = o.map((s) => typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([l, i]) => [t + l, i])) : s);
  return [r, n];
}) : e, dt = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const n = (s, l) => {
    r.set(s, l), t++, t > e && (t = 0, o = r, r = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let l = r.get(s);
      if (l !== void 0)
        return l;
      if ((l = o.get(s)) !== void 0)
        return n(s, l), l;
    },
    set(s, l) {
      r.has(s) ? r.set(s, l) : n(s, l);
    }
  };
}, Ce = "!", ut = (e) => {
  const {
    separator: t,
    experimentalParseClassName: r
  } = e, o = t.length === 1, n = t[0], s = t.length, l = (i) => {
    const d = [];
    let u = 0, f = 0, h;
    for (let v = 0; v < i.length; v++) {
      let A = i[v];
      if (u === 0) {
        if (A === n && (o || i.slice(v, v + s) === t)) {
          d.push(i.slice(f, v)), f = v + s;
          continue;
        }
        if (A === "/") {
          h = v;
          continue;
        }
      }
      A === "[" ? u++ : A === "]" && u--;
    }
    const p = d.length === 0 ? i : i.substring(f), _ = p.startsWith(Ce), E = _ ? p.substring(1) : p, S = h && h > f ? h - f : void 0;
    return {
      modifiers: d,
      hasImportantModifier: _,
      baseClassName: E,
      maybePostfixModifierPosition: S
    };
  };
  return r ? (i) => r({
    className: i,
    parseClassName: l
  }) : l;
}, gt = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let r = [];
  return e.forEach((o) => {
    o[0] === "[" ? (t.push(...r.sort(), o), r = []) : r.push(o);
  }), t.push(...r.sort()), t;
}, ft = (e) => ({
  cache: dt(e.cacheSize),
  parseClassName: ut(e),
  ...st(e)
}), pt = /\s+/, bt = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: o,
    getConflictingClassGroupIds: n
  } = t, s = [], l = e.trim().split(pt);
  let i = "";
  for (let d = l.length - 1; d >= 0; d -= 1) {
    const u = l[d], {
      modifiers: f,
      hasImportantModifier: h,
      baseClassName: p,
      maybePostfixModifierPosition: _
    } = r(u);
    let E = !!_, S = o(E ? p.substring(0, _) : p);
    if (!S) {
      if (!E) {
        i = u + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (S = o(p), !S) {
        i = u + (i.length > 0 ? " " + i : i);
        continue;
      }
      E = !1;
    }
    const v = gt(f).join(":"), A = h ? v + Ce : v, w = A + S;
    if (s.includes(w))
      continue;
    s.push(w);
    const L = n(S, E);
    for (let N = 0; N < L.length; ++N) {
      const O = L[N];
      s.push(A + O);
    }
    i = u + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function ht() {
  let e = 0, t, r, o = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (r = ke(t)) && (o && (o += " "), o += r);
  return o;
}
const ke = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = ke(e[o])) && (r && (r += " "), r += t);
  return r;
};
function mt(e, ...t) {
  let r, o, n, s = l;
  function l(d) {
    const u = t.reduce((f, h) => h(f), e());
    return r = ft(u), o = r.cache.get, n = r.cache.set, s = i, i(d);
  }
  function i(d) {
    const u = o(d);
    if (u)
      return u;
    const f = bt(d, r);
    return n(d, f), f;
  }
  return function() {
    return s(ht.apply(null, arguments));
  };
}
const C = (e) => {
  const t = (r) => r[e] || [];
  return t.isThemeGetter = !0, t;
}, Ee = /^\[(?:([a-z-]+):)?(.+)\]$/i, vt = /^\d+\/\d+$/, yt = /* @__PURE__ */ new Set(["px", "full", "screen"]), xt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, wt = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, _t = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, At = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, St = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, $ = (e) => K(e) || yt.has(e) || vt.test(e), q = (e) => Q(e, "length", Gt), K = (e) => !!e && !Number.isNaN(Number(e)), ae = (e) => Q(e, "number", K), re = (e) => !!e && Number.isInteger(Number(e)), Ct = (e) => e.endsWith("%") && K(e.slice(0, -1)), g = (e) => Ee.test(e), W = (e) => xt.test(e), kt = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Et = (e) => Q(e, kt, Le), Lt = (e) => Q(e, "position", Le), It = /* @__PURE__ */ new Set(["image", "url"]), Nt = (e) => Q(e, It, zt), Tt = (e) => Q(e, "", Mt), oe = () => !0, Q = (e, t, r) => {
  const o = Ee.exec(e);
  return o ? o[1] ? typeof t == "string" ? o[1] === t : t.has(o[1]) : r(o[2]) : !1;
}, Gt = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  wt.test(e) && !_t.test(e)
), Le = () => !1, Mt = (e) => At.test(e), zt = (e) => St.test(e), Ot = () => {
  const e = C("colors"), t = C("spacing"), r = C("blur"), o = C("brightness"), n = C("borderColor"), s = C("borderRadius"), l = C("borderSpacing"), i = C("borderWidth"), d = C("contrast"), u = C("grayscale"), f = C("hueRotate"), h = C("invert"), p = C("gap"), _ = C("gradientColorStops"), E = C("gradientColorStopPositions"), S = C("inset"), v = C("margin"), A = C("opacity"), w = C("padding"), L = C("saturate"), N = C("scale"), O = C("sepia"), X = C("skew"), m = C("space"), b = C("translate"), y = () => ["auto", "contain", "none"], k = () => ["auto", "hidden", "clip", "visible", "scroll"], z = () => ["auto", g, t], x = () => [g, t], J = () => ["", $, q], G = () => ["auto", K, g], U = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], c = () => ["solid", "dashed", "dotted", "double", "none"], a = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], R = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], te = () => ["", "0", g], be = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], P = () => [K, g];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [oe],
      spacing: [$, q],
      blur: ["none", "", W, g],
      brightness: P(),
      borderColor: [e],
      borderRadius: ["none", "", "full", W, g],
      borderSpacing: x(),
      borderWidth: J(),
      contrast: P(),
      grayscale: te(),
      hueRotate: P(),
      invert: te(),
      gap: x(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Ct, q],
      inset: z(),
      margin: z(),
      opacity: P(),
      padding: x(),
      saturate: P(),
      scale: P(),
      sepia: te(),
      skew: P(),
      space: x(),
      translate: x()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", g]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [W]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": be()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": be()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...U(), g]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: k()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": k()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": k()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: y()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": y()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": y()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [S]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [S]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [S]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [S]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [S]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [S]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [S]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [S]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [S]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", re, g]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: z()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", g]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: te()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: te()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", re, g]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [oe]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", re, g]
        }, g]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": G()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": G()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [oe]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [re, g]
        }, g]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": G()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": G()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", g]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", g]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [p]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [p]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [p]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...R()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...R(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...R(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [w]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [w]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [w]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [w]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [w]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [w]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [w]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [w]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [w]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [v]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [v]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [v]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [v]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [v]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [v]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [v]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [v]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [v]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [m]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [m]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", g, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [g, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [g, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [W]
        }, W]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [g, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [g, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [g, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [g, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", W, q]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", ae]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [oe]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", g]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", K, ae]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", $, g]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", g]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", g]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [A]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [A]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...c(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", $, q]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", $, g]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: x()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", g]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", g]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [A]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...U(), Lt]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Et]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Nt]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [E]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [E]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [E]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [_]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [_]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [_]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [s]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [s]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [s]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [s]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [s]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [s]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [s]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [s]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [s]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [s]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [s]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [s]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [s]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [s]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [s]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [i]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [i]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [i]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [i]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [i]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [i]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [i]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [i]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [i]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [A]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...c(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [i]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [i]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [A]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: c()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [n]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [n]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [n]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [n]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [n]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [n]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [n]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [n]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [n]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [n]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...c()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [$, g]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [$, q]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: J()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [A]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [$, q]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", W, Tt]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [oe]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [A]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...a(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": a()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [r]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [o]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [d]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", W, g]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [u]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [f]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [h]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [L]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [O]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [r]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [o]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [d]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [u]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [f]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [h]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [A]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [L]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [O]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [l]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [l]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [l]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", g]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: P()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", g]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: P()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", g]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [N]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [N]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [N]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [re, g]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [b]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [b]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [X]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [X]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", g]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", g]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": x()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": x()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": x()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": x()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": x()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": x()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": x()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": x()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": x()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": x()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": x()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": x()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": x()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": x()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": x()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": x()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": x()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": x()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", g]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [$, q, ae]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, Rt = /* @__PURE__ */ mt(Ot);
function Tr(...e) {
  return Rt(nt(e));
}
const Bt = ["es", "en"], Vt = "en", Ft = {
  es: {
    locale: "es",
    dateFormat: "dd/MM/yyyy",
    twoDigits: !0
  },
  en: {
    locale: "en",
    dateFormat: "MM/dd/yyyy",
    twoDigits: !0
  }
  // You can add more languages here that are available in translation files
  // but only those defined in AVAILABLE_LANGUAGES will be active
}, Ut = {
  NUMBER_FORMAT_PATTERN: "0,000.00",
  NUMBER_ROUND_MODE: "truncate",
  NUMBER_LOCATE: "en-US",
  NUMBER_MIN_DECIMALS: 2,
  NUMBER_MAX_DECIMALS: 4
}, Dt = {
  SESSION_DURATION: 8 * (60 * 60 * 1e3),
  // 8 hours in milliseconds
  VALIDATION_INTERVAL: 60 * 1e3
  // 1 minute in milliseconds
}, V = {
  // Language Configuration
  AVAILABLE_LANGUAGES: Bt,
  DEFAULT_LANGUAGE: Vt,
  LANGUAGE_CONFIG: Ft,
  NUMBER_FORMAT_CONFIG: Ut,
  SESSION_CONFIG: Dt,
  // Development environment detection - defaults to false in production
  IS_DEVELOPMENT: !1
}, le = V;
let H = V;
function ie(e, t = {}, r = "auto") {
  switch (r) {
    case "parent":
      const o = { ...e };
      return Object.keys(e).forEach((s) => {
        s in t && t[s] !== void 0 && (o[s] = t[s]);
      }), o;
    case "library":
      return e;
    case "auto":
    default:
      const n = { ...e };
      return Object.keys(e).forEach((s) => {
        if (s in t) {
          const l = t[s];
          if (l != null) {
            if (typeof l == "string" && l === "")
              return;
            n[s] = l;
          }
        }
      }), n;
  }
}
function Gr() {
  return { ...H };
}
function Mr(e) {
  return H[e];
}
function zr(e) {
  const t = {};
  Object.keys(H).forEach((r) => {
    r in e && e[r] !== void 0 && (t[r] = e[r]);
  }), H = { ...H, ...t };
}
function Or() {
  H = V;
}
const Rr = H, ee = Z(void 0);
function Pt() {
  const e = D(ee);
  if (!e)
    throw new Error("useConfig must be used within a ConfigProvider");
  return e;
}
function Br(e, t) {
  const { config: r } = Pt();
  return r[e] ?? t ?? le[e];
}
function $t(e, t, r) {
  const [o, n] = M(
    () => ie(le, e, t)
  );
  return I(() => {
    r && n(ie(le, e, t));
  }, [e, t, r]), { config: o, setConfig: n };
}
function jt(e, t, r, o) {
  const n = j((l) => {
    o && e((i) => ie(i, l, "parent"));
  }, [o, e]), s = j(() => {
    e(ie(le, t, r));
  }, [t, r, e]);
  return { updateConfig: n, resetConfig: s };
}
function qt() {
  return D(ee)?.config || null;
}
const Ie = Z(void 0);
function Wt() {
  return D(Ie);
}
function Xt(e) {
  const t = e || V.DEFAULT_LANGUAGE, r = V.AVAILABLE_LANGUAGES.includes(t) ? t : V.DEFAULT_LANGUAGE, [o, n] = M(r), s = j((l) => {
    V.AVAILABLE_LANGUAGES.includes(l) ? n(l) : console.warn(`Language "${l}" is not in AVAILABLE_LANGUAGES. Staying with "${o}".`);
  }, [o]);
  return { lang: o, setValidatedLang: s };
}
function Yt(e) {
  const t = qt();
  return F(() => {
    const r = t?.LANGUAGE_CONFIG || V.LANGUAGE_CONFIG, o = t?.AVAILABLE_LANGUAGES || V.AVAILABLE_LANGUAGES, n = r[e] || r[V.DEFAULT_LANGUAGE];
    return {
      dateFormat: n.dateFormat,
      twoDigits: n.twoDigits,
      config: n,
      availableLanguages: o
    };
  }, [e, t]);
}
const Ne = Z(void 0);
function ge() {
  const e = D(Ne);
  if (!e) throw new Error("useLibI18n must be used within LibI18nProvider");
  return e;
}
function Vr(e) {
  return e ? { parentLanguageProvider: e } : {};
}
function Ht() {
  return D(ee)?.config || null;
}
function Jt(e, t) {
  const o = Ht()?.DEFAULT_LANGUAGE, [n, s] = M(
    e ?? o ?? "en"
  ), l = t?.lang ?? e ?? n;
  return I(() => {
    !t && e && e !== n && s(e);
  }, [t, e, n]), I(() => {
    !t && !e && o && o !== n && s(o);
  }, [t, e, o, n]), { effectiveLang: l, internal: n, setInternal: s };
}
const Te = (e, t = "") => {
  const r = {};
  for (const [o, n] of Object.entries(e)) {
    const s = t ? `${t}.${o}` : o;
    typeof n == "object" && n !== null && !Array.isArray(n) ? Object.assign(r, Te(n, s)) : typeof n == "string" && (r[s] = n);
  }
  return r;
};
function Kt(e) {
  const [t, r] = M({});
  return I(() => {
    const o = async () => {
      const n = {};
      for (const s of e)
        try {
          const l = await import(
            /* @vite-ignore */
            s.path
          );
          n[s.lang] = l.default || l;
        } catch (l) {
          console.warn(`Failed to load translation file for ${s.lang} from ${s.path}:`, l), n[s.lang] = {};
        }
      r(n);
    };
    e.length > 0 && o();
  }, [e]), t;
}
function Zt(e, t, r) {
  const o = F(() => {
    const l = e[t];
    return l ? Te(l) : {};
  }, [e, t]), n = F(() => _e({}, o, r === "component-first" ? "local-first" : "global-first"), [o, r]), s = j(() => o, [o]);
  return { t: n, getExternalTranslations: s, processedGlobalTranslations: o };
}
function Qt(e, t, r, o) {
  const n = j((l) => {
    if (r?.setLang) {
      r.setLang(l);
      return;
    }
    if (o) {
      o(l);
      return;
    }
    t(l);
  }, [r, o, t]), s = j((l) => l[e] ?? l.default, [e]);
  return { setLanguage: n, resolveLabel: s };
}
function er() {
  const t = D(ee)?.config;
  let r;
  try {
    r = ge();
  } catch {
    r = null;
  }
  const o = Wt();
  if (r) {
    const l = r.lang, i = t?.LANGUAGE_CONFIG?.[l];
    if (i)
      return {
        lang: l,
        config: i
      };
  }
  if (o) {
    const l = o.lang, i = t?.LANGUAGE_CONFIG?.[l];
    if (i)
      return {
        lang: l,
        config: i
      };
  }
  const n = t?.DEFAULT_LANGUAGE || "en", s = t?.LANGUAGE_CONFIG?.[n];
  return s ? {
    lang: n,
    config: s
  } : {
    lang: "en",
    config: {}
  };
}
function fe(e) {
  if (!e && e !== 0) return null;
  if (e instanceof Date) return isNaN(e.getTime()) ? null : e;
  const t = new Date(e);
  return isNaN(t.getTime()) ? null : t;
}
function Ge(e, t, r) {
  const o = e.getDate(), n = e.getMonth() + 1, s = e.getFullYear(), l = r ? String(o).padStart(2, "0") : String(o), i = r ? String(n).padStart(2, "0") : String(n), d = String(s);
  return t.replace("dd", l).replace("MM", i).replace("yyyy", d);
}
function tr() {
  const { lang: e, config: t } = er();
  return F(() => {
    const r = t?.dateFormat || "MM/dd/yyyy", o = t?.twoDigits ?? !0;
    return {
      dateFormat: r,
      twoDigits: o,
      lang: e
    };
  }, [t, e]);
}
function rr() {
  const { dateFormat: e, twoDigits: t } = tr();
  return F(
    () => (r) => {
      const o = fe(r);
      return o ? Ge(o, e, t) : "";
    },
    [e, t]
  );
}
function Fr(e) {
  const t = rr(), r = F(() => fe(e), [e]);
  return F(() => r ? t(r) : "", [r, t]);
}
function Ur(e, t, r = !0) {
  const o = fe(e);
  return o ? Ge(o, t, r) : "";
}
function or(e, t) {
  const r = ge(), o = e ?? r.lang, n = Qe(o), s = r.getExternalTranslations(), l = t?.order ?? (r.translationPriority === "component-first" ? "local-first" : "global-first"), i = _e(n, s, l);
  return { lang: o, t: i };
}
function nr(e) {
  const [t, r] = M(he()), [o, n] = M(e);
  I(() => {
    if (e) {
      n(e);
      return;
    }
    n(void 0);
  }, [e]), I(() => {
    const d = () => r(he());
    if (typeof window < "u")
      return window.addEventListener("resize", d), () => window.removeEventListener("resize", d);
  }, []);
  const s = rt(t), l = et(), i = F(() => ot(o, t, s, l), [o, t, s, l]);
  return { cfg: o, width: t, device: s, orientation: l, isVisible: i };
}
const Me = Z(null);
function sr() {
  const e = D(Me);
  if (!e) throw new Error("TagSelectorProvider not mounted");
  return e;
}
const lr = ({ children: e, config: t, langOverride: r, i18nOrder: o = "local-first" }) => {
  const { theme: n } = Be(), { t: s } = or(r, { order: o }), { cfg: l, width: i, device: d, orientation: u, isVisible: f } = nr(t), h = F(() => ({
    theme: n,
    t: s,
    visibilityConfig: l,
    isVisible: f,
    device: d,
    orientation: u,
    width: i
  }), [n, s, l, f, d, u, i]);
  return /* @__PURE__ */ T(Me.Provider, { value: h, children: e });
}, ir = "_container_1gqps_1", ar = "_chip_1gqps_7", cr = "_light_1gqps_31", dr = "_dark_1gqps_32", ur = "_sm_1gqps_35", gr = "_md_1gqps_40", fr = "_lg_1gqps_45", pr = "_selected_1gqps_124", br = "_unselected_1gqps_136", hr = "_all_1gqps_174", mr = "_hidden_1gqps_196", B = {
  container: ir,
  chip: ar,
  light: cr,
  dark: dr,
  sm: ur,
  md: gr,
  lg: fr,
  "tam-1": "_tam-1_1gqps_51",
  "tam-2": "_tam-2_1gqps_57",
  "tam-3": "_tam-3_1gqps_63",
  "tam-4": "_tam-4_1gqps_69",
  "tam-5": "_tam-5_1gqps_75",
  "tam-6": "_tam-6_1gqps_81",
  "tam-7": "_tam-7_1gqps_87",
  "tam-8": "_tam-8_1gqps_93",
  "tam-9": "_tam-9_1gqps_99",
  "tam-10": "_tam-10_1gqps_105",
  "tam-11": "_tam-11_1gqps_111",
  "tam-12": "_tam-12_1gqps_117",
  selected: pr,
  unselected: br,
  all: hr,
  hidden: mr,
  "chip-layout-only": "_chip-layout-only_1gqps_203"
};
function vr(e, t, r) {
  const o = [B.container, B[e]];
  return t || o.push(B.hidden), r && o.push(r), o.join(" ");
}
function yr(e, t) {
  return t ? `${e} ${t}` : e;
}
function se(e, t, r, o, n, s, l) {
  const i = [B.chip, B[e]];
  B[o] ? i.push(B[o]) : i.push(B.md), n ? i.push(B.all) : i.push(r ? B.selected : B.unselected), t || i.push(B.hidden), s && i.push(s);
  const d = i.join(" ");
  return yr(d, l);
}
const xr = ({
  className: e,
  chipClassName: t,
  tags: r,
  selectedTags: o,
  onSelectionChange: n,
  allowMultiple: s = !0,
  allowAll: l = !0,
  requireSelection: i = !1,
  size: d = "md",
  disabled: u = !1,
  isLoading: f = !1,
  allLabel: h
}) => {
  const { theme: p, t: _, isVisible: E } = sr(), { resolveLabel: S } = ge(), v = (m) => r.find((b) => b.id === m) || null, A = (m) => m.map((b) => v(b)).filter((b) => b !== null), w = () => {
    if (u) return;
    if (r.length > 0 && r.every((b) => o.includes(b.id)))
      n([]);
    else {
      const b = {
        id: "__all__",
        label: h || {
          en: "All",
          es: "Todos",
          default: "All"
        }
      };
      n([...r, b]);
    }
  }, L = (m) => {
    if (!u)
      if (s)
        if (o.includes(m))
          if (i) {
            if (o.length > 1) {
              const y = o.filter((k) => k !== m);
              n(A(y));
            }
          } else if (l) {
            const y = o.filter((k) => k !== m);
            n(A(y));
          } else {
            const y = o.filter((k) => k !== m);
            n(A(y));
          }
        else {
          const y = [...o, m], k = A(y);
          if (r.length > 0 && r.every((x) => y.includes(x.id)) && l) {
            const x = {
              id: "__all__",
              label: h || {
                en: "All",
                es: "Todos",
                default: "All"
              }
            };
            n([...k, x]);
          } else
            n(k);
        }
      else {
        const b = v(m);
        n(b ? [b] : []);
      }
  }, N = r.length > 0 && r.every((m) => o.includes(m.id));
  o.length;
  const O = (m, b) => {
    if (!m.metadata?.colors) return {};
    const y = m.metadata.colors[p];
    if (!y) return {};
    const k = b ? y.selected : y.unselected;
    if (!k) return {};
    const z = {};
    return k.background && (z.backgroundColor = k.background), k.text && (z.color = k.text), k.border && (z.borderColor = k.border), z;
  }, X = (m) => {
    if (!m.metadata?.sizing) return {};
    const b = m.metadata.sizing, y = {};
    return b.paddingX && (y.paddingLeft = b.paddingX, y.paddingRight = b.paddingX), b.paddingY && (y.paddingTop = b.paddingY, y.paddingBottom = b.paddingY), b.fontSize && (y.fontSize = b.fontSize), b.minWidth && (y.minWidth = b.minWidth), b.height && (y.height = b.height), y;
  };
  return /* @__PURE__ */ ye(
    "div",
    {
      className: vr(p, E, e),
      "data-testid": "tag-selector-container",
      children: [
        l && !i && r.length > 0 && /* @__PURE__ */ T(
          "button",
          {
            className: se(p, E, N, d, !0, void 0, t),
            onClick: w,
            disabled: u,
            "data-testid": "tag-all",
            children: h ? S(h) : _("all")
          }
        ),
        r.map((m) => {
          const b = o.includes(m.id), y = m.metadata?.colors, k = y ? O(m, b) : {}, z = X(m), x = (G) => {
            if (u || !y) return;
            const U = m.metadata?.colors?.[p], c = b ? U?.selected : U?.unselected;
            c?.hoverBackground && (G.currentTarget.style.backgroundColor = c.hoverBackground), c?.hoverBorder && (G.currentTarget.style.borderColor = c.hoverBorder), c?.hoverText && (G.currentTarget.style.color = c.hoverText);
          }, J = (G) => {
            if (u || !y) return;
            const U = m.metadata?.colors?.[p], c = b ? U?.selected : U?.unselected;
            c?.background && (G.currentTarget.style.backgroundColor = c.background), c?.border && (G.currentTarget.style.borderColor = c.border), c?.text && (G.currentTarget.style.color = c.text);
          };
          return /* @__PURE__ */ T(
            "button",
            {
              className: se(p, E, b, d, !1, void 0, t),
              style: { ...k, ...z },
              onClick: () => L(m.id),
              onMouseEnter: x,
              onMouseLeave: J,
              disabled: u,
              "data-testid": `tag-${m.id}`,
              children: S(m.label)
            },
            m.id
          );
        }),
        f && /* @__PURE__ */ T(
          "span",
          {
            className: se(p, E, !1, d, !1, "opacity-50"),
            "data-testid": "tag-loading",
            children: _("loading")
          }
        ),
        !f && r.length === 0 && /* @__PURE__ */ T(
          "span",
          {
            className: se(p, E, !1, d, !1, "opacity-50"),
            "data-testid": "tag-no-tags",
            children: _("no_tags")
          }
        )
      ]
    }
  );
}, Dr = ({
  id: e,
  className: t,
  chipClassName: r,
  style: o,
  getTagsFunction: n,
  // Required async function
  selectedTags: s,
  onSelectionChange: l,
  allowMultiple: i,
  allowAll: d,
  requireSelection: u,
  config: f,
  size: h,
  disabled: p,
  langOverride: _,
  i18nOrder: E,
  allLabel: S,
  defaultSelectedTags: v,
  theme: A,
  customColors: w
}) => {
  const [L, N] = M([]), [O, X] = M(!1), [m, b] = M(null), [y, k] = M(!1), z = (c) => {
    l(c);
  };
  I(() => {
    let c = !1;
    return (async () => {
      X(!0), b(null);
      try {
        const R = await n();
        c || N(R);
      } catch (R) {
        c || (b(R instanceof Error ? R.message : "Failed to load tags"), N([]));
      } finally {
        c || X(!1);
      }
    })(), () => {
      c = !0;
    };
  }, [n]), I(() => {
    if (!y && L.length > 0 && v && v.length > 0) {
      const c = v.filter(
        (a) => L.some((R) => R.id === a)
      );
      if (c.length > 0) {
        const a = L.filter(
          (R) => c.includes(R.id)
        );
        l(a);
      }
      k(!0);
    }
  }, [L, v, y, l]);
  const J = (() => {
    if (!w) return;
    const c = {};
    if (w.light) {
      const a = w.light;
      a.selected && (a.selected.background && (c["--tag-light-selected-bg"] = a.selected.background), a.selected.text && (c["--tag-light-selected-text"] = a.selected.text), a.selected.border && (c["--tag-light-selected-border"] = a.selected.border), a.selected.hoverBackground && (c["--tag-light-selected-hover-bg"] = a.selected.hoverBackground), a.selected.hoverBorder && (c["--tag-light-selected-hover-border"] = a.selected.hoverBorder)), a.unselected && (a.unselected.background && (c["--tag-light-unselected-bg"] = a.unselected.background), a.unselected.text && (c["--tag-light-unselected-text"] = a.unselected.text), a.unselected.border && (c["--tag-light-unselected-border"] = a.unselected.border), a.unselected.hoverBackground && (c["--tag-light-unselected-hover-bg"] = a.unselected.hoverBackground), a.unselected.hoverBorder && (c["--tag-light-unselected-hover-border"] = a.unselected.hoverBorder)), a.all && (a.all.background && (c["--tag-light-all-bg"] = a.all.background), a.all.text && (c["--tag-light-all-text"] = a.all.text), a.all.border && (c["--tag-light-all-border"] = a.all.border), a.all.hoverBackground && (c["--tag-light-all-hover-bg"] = a.all.hoverBackground), a.all.hoverBorder && (c["--tag-light-all-hover-border"] = a.all.hoverBorder));
    }
    if (w.dark) {
      const a = w.dark;
      a.selected && (a.selected.background && (c["--tag-dark-selected-bg"] = a.selected.background), a.selected.text && (c["--tag-dark-selected-text"] = a.selected.text), a.selected.border && (c["--tag-dark-selected-border"] = a.selected.border), a.selected.hoverBackground && (c["--tag-dark-selected-hover-bg"] = a.selected.hoverBackground), a.selected.hoverBorder && (c["--tag-dark-selected-hover-border"] = a.selected.hoverBorder)), a.unselected && (a.unselected.background && (c["--tag-dark-unselected-bg"] = a.unselected.background), a.unselected.text && (c["--tag-dark-unselected-text"] = a.unselected.text), a.unselected.border && (c["--tag-dark-unselected-border"] = a.unselected.border), a.unselected.hoverBackground && (c["--tag-dark-unselected-hover-bg"] = a.unselected.hoverBackground), a.unselected.hoverBorder && (c["--tag-dark-unselected-hover-border"] = a.unselected.hoverBorder)), a.all && (a.all.background && (c["--tag-dark-all-bg"] = a.all.background), a.all.text && (c["--tag-dark-all-text"] = a.all.text), a.all.border && (c["--tag-dark-all-border"] = a.all.border), a.all.hoverBackground && (c["--tag-dark-all-hover-bg"] = a.all.hoverBackground), a.all.hoverBorder && (c["--tag-dark-all-hover-border"] = a.all.hoverBorder));
    }
    return c;
  })(), G = {
    ...o,
    ...J
  }, U = A ? t ? `${t} ${A}` : A : t;
  return /* @__PURE__ */ T(lr, { config: f, langOverride: _, i18nOrder: E, children: /* @__PURE__ */ T("div", { id: e, className: U, style: G, children: m ? /* @__PURE__ */ ye(
    "div",
    {
      className: "text-red-500 text-sm p-2",
      "data-testid": "tag-selector-error",
      children: [
        "Error: ",
        m
      ]
    }
  ) : /* @__PURE__ */ T(
    xr,
    {
      className: t,
      chipClassName: r,
      tags: L,
      selectedTags: s,
      onSelectionChange: z,
      allLabel: S,
      allowMultiple: i,
      allowAll: d,
      requireSelection: u,
      size: h,
      disabled: p || O,
      isLoading: O
    }
  ) }) });
};
function Pr({
  language: e,
  onLanguageChange: t,
  parentLanguageProvider: r,
  globalTranslationPaths: o = [],
  translationPriority: n = "component-first",
  children: s
}) {
  const { effectiveLang: l, setInternal: i } = Jt(e, r), d = Kt(o), { t: u, getExternalTranslations: f } = Zt(
    d,
    l,
    n
  ), { setLanguage: h, resolveLabel: p } = Qt(
    l,
    i,
    r,
    t
  ), _ = F(
    () => ({
      lang: l,
      t: u,
      setLanguage: h,
      resolveLabel: p,
      getExternalTranslations: f,
      translationPriority: n
    }),
    [l, u, h, p, f, n]
  );
  return /* @__PURE__ */ T(Ne.Provider, { value: _, children: s });
}
function $r({ initial: e, children: t }) {
  const { lang: r, setValidatedLang: o } = Xt(e), n = Yt(r), s = F(() => ({
    lang: r,
    setLang: o,
    ...n
  }), [r, o, n]);
  return /* @__PURE__ */ T(Ie.Provider, { value: s, children: t });
}
function jr({
  children: e,
  parentConfig: t = {},
  priority: r = "auto",
  enableOverrides: o = !0
}) {
  const { config: n, setConfig: s } = $t(t, r, o), { updateConfig: l, resetConfig: i } = jt(
    s,
    t,
    r,
    o
  ), d = F(() => ({
    config: n,
    updateConfig: l,
    resetConfig: i,
    priority: r
  }), [n, l, i, r]);
  return /* @__PURE__ */ T(ee.Provider, { value: d, children: e });
}
const pe = "app_session_data";
function wr(e) {
  try {
    localStorage.setItem(pe, JSON.stringify(e));
  } catch (t) {
    console.error("Failed to save session to storage:", t);
  }
}
function ne() {
  try {
    const e = localStorage.getItem(pe);
    if (!e) return null;
    const t = JSON.parse(e);
    return !t.sessionId || !t.sessionStartTime || !t.lastActivityTime ? null : t;
  } catch (e) {
    return console.error("Failed to get session from storage:", e), null;
  }
}
function _r() {
  try {
    localStorage.removeItem(pe);
  } catch (e) {
    console.error("Failed to clear session from storage:", e);
  }
}
function de(e, t) {
  return Date.now() - e.sessionStartTime > t;
}
function Ar() {
  const e = ne();
  return e !== null && !!e.sessionId;
}
function Sr({
  enabled: e = !1,
  sessionDuration: t,
  checkInterval: r,
  autoActivateIfSession: o = !0,
  onSessionInvalid: n
}) {
  if (!t)
    throw new Error("SessionValidator: sessionDuration is required");
  if (!r)
    throw new Error("SessionValidator: checkInterval is required");
  const [s, l] = M(null), [i, d] = M(!1), u = Y(null), f = Y(!1), h = e || o && Ar();
  I(() => {
    if (!h) return;
    const _ = ne();
    _ ? l(_) : f.current || (f.current = !0, n?.());
  }, [h, n]);
  const p = j(() => {
    if (!h) return;
    console.log("[SessionValidator] Validando sesión...", (/* @__PURE__ */ new Date()).toLocaleTimeString()), d(!0);
    const _ = ne();
    if (!_) {
      f.current || (f.current = !0, n?.()), d(!1);
      return;
    }
    if (de(_, t)) {
      f.current || (f.current = !0, n?.()), d(!1);
      return;
    }
    l(_), d(!1);
  }, [h, t, n]);
  return I(() => {
    if (!h) {
      u.current && (clearInterval(u.current), u.current = null), f.current = !1;
      return;
    }
    return p(), u.current = setInterval(() => {
      p();
    }, r), () => {
      u.current && (clearInterval(u.current), u.current = null);
    };
  }, [h, r, p]), {
    isActive: h,
    sessionData: s,
    isValidating: i
  };
}
const Cr = ({
  children: e,
  enabled: t = !1,
  sessionDuration: r,
  checkInterval: o,
  autoActivateIfSession: n = !0,
  onSessionInvalid: s
}) => (Sr({
  enabled: t,
  sessionDuration: r,
  checkInterval: o,
  autoActivateIfSession: n,
  onSessionInvalid: s
}), /* @__PURE__ */ T(Oe, { children: e })), ze = Z(null);
function kr() {
  return `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
function Er() {
  return D(ee)?.config || null;
}
function qr({
  children: e,
  sessionDuration: t,
  validationInterval: r,
  onLogging: o,
  onSessionInvalid: n
}) {
  const s = Er(), l = t ?? s?.SESSION_CONFIG?.SESSION_DURATION ?? V.SESSION_CONFIG.SESSION_DURATION, i = r ?? s?.SESSION_CONFIG?.VALIDATION_INTERVAL ?? V.SESSION_CONFIG.VALIDATION_INTERVAL, [d, u] = M(!1), f = Y(!1), h = Y(!1), p = Y(null), _ = Y(o), E = Y(n);
  I(() => {
    _.current = o;
  }, [o]), I(() => {
    E.current = n;
  }, [n]);
  const S = j((w = !1) => {
    const L = kr();
    wr({
      sessionId: L,
      sessionStartTime: Date.now(),
      lastActivityTime: Date.now()
    }), u(!0), f.current = !1, _.current?.(), !w && !h.current && p.current && p.current.postMessage({
      type: "session_login",
      sessionId: L,
      timestamp: Date.now()
    });
  }, []), v = j((w = !1) => {
    f.current || (f.current = !0, _r(), u(!1), E.current?.(), !w && !h.current && p.current && p.current.postMessage({
      type: "session_logout",
      timestamp: Date.now()
    }));
  }, []);
  I(() => {
    p.current = new BroadcastChannel("app_auth_channel");
    const w = (L) => {
      const { type: N } = L.data;
      if (console.log("recibiendo eventos"), N === "session_login") {
        h.current = !0;
        const O = ne();
        O && !de(O, l) && (S(!0), f.current = !1), h.current = !1;
      } else N === "session_logout" && (h.current = !0, v(!0), h.current = !1);
    };
    return p.current.onmessage = w, () => {
      p.current && (p.current.close(), p.current = null);
    };
  }, []), I(() => {
    const w = ne();
    w && !de(w, l) ? (console.log("useEffect-getSessionFromStorage"), S(!0)) : w && v(!0);
  }, []);
  const A = {
    isAuthenticated: d,
    login: S,
    logout: v
  };
  return /* @__PURE__ */ T(ze.Provider, { value: A, children: /* @__PURE__ */ T(
    Cr,
    {
      enabled: d,
      sessionDuration: l,
      checkInterval: i,
      onSessionInvalid: v,
      children: e
    }
  ) });
}
function Wr() {
  const e = D(ze);
  if (!e)
    throw new Error("useAppAuth must be used within AppAuthProvider");
  return e;
}
function Xr() {
  return null;
}
export {
  H as APP_CONFIG,
  qr as AppAuthProvider,
  Pr as AppLanguageLibUiProvider,
  $r as AppLanguageProvider,
  jr as ConfigProvider,
  Pr as LibI18nProvider,
  Dr as TagSelector,
  Nr as ThemeProvider,
  Tr as cn,
  Rr as config,
  rt as detectDevice,
  et as detectOrientation,
  Xr as detectParentLanguageProvider,
  he as detectWidth,
  Ur as formatDate,
  Gr as getConfig,
  Mr as getConfigValue,
  tt as interpolate,
  ot as isVisibleByConfig,
  _e as makeTranslator,
  Or as resetGlobalConfig,
  xe as tokens,
  zr as updateGlobalConfig,
  Wr as useAppAuth,
  Wt as useAppLanguage,
  Pt as useConfig,
  Br as useConfigValue,
  rr as useDateFormatter,
  Fr as useFormattedDate,
  ge as useLibI18n,
  Vr as useParentLanguageInjection,
  Re as useTheme
};
//# sourceMappingURL=gc-ui-components.es.js.map
