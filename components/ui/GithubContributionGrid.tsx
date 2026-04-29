"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap, gsap, useGSAP, withMotionPreference } from "@/lib/gsap";

type ContributionCell = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  key: string;
};

type ParsedContribution = {
  width: number;
  height: number;
  cells: ContributionCell[];
};

type LayerName = "base" | "regrow";
type SelectedSlot = {
  cell: HTMLDivElement;
  nextActiveLayer: LayerName;
  visibleLayer: HTMLDivElement;
  regrowLayer: HTMLDivElement;
};

const CONTRIBUTION_API_PARAMS = "?scheme=grey&bg=020202&no-legend=true";
const PRELOAD_ROOT_MARGIN = "200px 0px";
const DEFAULT_GRAPH_ASPECT_RATIO = "52 / 7";
const CELL_TRANSFORM_ORIGIN = "50% 100%";
const REGROW_TRANSFORM_ORIGIN = "50% 50%";
const AMBIENT_FALL_DURATION = 0.68;
const AMBIENT_REGROW_DELAY = 0.58;
const AMBIENT_REGROW_DURATION = 0.48;
const AMBIENT_FALL_STAGGER = 0.05;
const AMBIENT_REGROW_STAGGER = 0.04;
const REVEAL_DURATION = 0.32;
const REVEAL_STAGGER_AMOUNT = 0.24;
const REVEAL_START_STATE = {
  autoAlpha: 0,
  y: 6,
  scaleX: 0.42,
  scaleY: 0.05,
  transformOrigin: CELL_TRANSFORM_ORIGIN,
};
const LAYER_HIDDEN_STATE = {
  autoAlpha: 0,
  x: 0,
  y: 0,
  rotate: 0,
  scaleX: 0.22,
  scaleY: 0.22,
  transformOrigin: REGROW_TRANSFORM_ORIGIN,
};
const LAYER_VISIBLE_STATE = {
  autoAlpha: 1,
  x: 0,
  y: 0,
  rotate: 0,
  scaleX: 1,
  scaleY: 1,
  transformOrigin: CELL_TRANSFORM_ORIGIN,
};

function getLayerSelector(layer: LayerName): string {
  return layer === "regrow"
    ? ".github-contrib-cell__regrow"
    : ".github-contrib-cell__base";
}

function getActiveLayer(cell: HTMLDivElement): LayerName {
  return cell.dataset.activeLayer === "regrow" ? "regrow" : "base";
}

function getInactiveLayer(layer: LayerName): LayerName {
  return layer === "regrow" ? "base" : "regrow";
}

function resolveSelectedSlots(cells: HTMLDivElement[]): SelectedSlot[] {
  return cells
    .map((cell) => {
      const activeLayer = getActiveLayer(cell);
      const visibleLayer = cell.querySelector<HTMLDivElement>(
        getLayerSelector(activeLayer),
      );
      const regrowLayer = cell.querySelector<HTMLDivElement>(
        getLayerSelector(getInactiveLayer(activeLayer)),
      );

      if (!visibleLayer || !regrowLayer) {
        return null;
      }

      return {
        cell,
        nextActiveLayer: getInactiveLayer(activeLayer),
        visibleLayer,
        regrowLayer,
      };
    })
    .filter((slot): slot is SelectedSlot => slot !== null);
}

function toNumber(value: string | null): number {
  if (!value) {
    return NaN;
  }

  const parsed = Number(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : NaN;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAmbientDelaySeconds(): number {
  return randomInt(2, 5);
}

function parseContributionSvg(svgText: string): ParsedContribution | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const parseError = doc.querySelector("parsererror");

  if (parseError) {
    return null;
  }

  const svg = doc.querySelector("svg");
  const rects = Array.from(doc.querySelectorAll("rect"));

  if (!svg || rects.length === 0) {
    return null;
  }

  let width = toNumber(svg.getAttribute("width"));
  let height = toNumber(svg.getAttribute("height"));

  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    const viewBox = svg.getAttribute("viewBox")?.split(/\s+/).map(Number);

    if (viewBox && viewBox.length >= 4) {
      width = viewBox[2];
      height = viewBox[3];
    }
  }

  const cells: ContributionCell[] = [];
  let maxX = Number.isFinite(width) ? width : 0;
  let maxY = Number.isFinite(height) ? height : 0;
  const classColorMap: Record<string, string> = {
    NONE: "#f6f6f6",
    FIRST_QUARTILE: "#e0e0e0",
    SECOND_QUARTILE: "#9e9e9e",
    THIRD_QUARTILE: "#616161",
    FOURTH_QUARTILE: "#212121",
  };

  for (const rect of rects) {
    const x = toNumber(rect.getAttribute("x"));
    const y = toNumber(rect.getAttribute("y"));
    const rectWidth = toNumber(rect.getAttribute("width"));
    const rectHeight = toNumber(rect.getAttribute("height"));

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      continue;
    }

    const hasContributionMetadata =
      rect.hasAttribute("data-date") ||
      rect.hasAttribute("data-level") ||
      rect.hasAttribute("data-count");

    if (!hasContributionMetadata) {
      continue;
    }

    const rectClasses = rect
      .getAttribute("class")
      ?.split(/\s+/)
      .filter(Boolean) ?? [];
    const quarterClass = rectClasses.find((item) => classColorMap[item]);

    const finalWidth = Number.isFinite(rectWidth) ? rectWidth : 10;
    const finalHeight = Number.isFinite(rectHeight) ? rectHeight : 10;

    const rawFill =
      rect.getAttribute("fill") ||
      rect.style.fill ||
      (quarterClass ? classColorMap[quarterClass] : "transparent");

    if (!rawFill || rawFill === "none") {
      continue;
    }

    const key =
      rect.getAttribute("data-date") ??
      `${x}-${y}-${finalWidth}-${finalHeight}-${rawFill}`;

    cells.push({
      x,
      y,
      width: finalWidth,
      height: finalHeight,
      fill: rawFill,
      key,
    });

    if (x + finalWidth > maxX) {
      maxX = x + finalWidth;
    }
    if (y + finalHeight > maxY) {
      maxY = y + finalHeight;
    }
  }

  if (cells.length === 0) {
    return null;
  }

  if (!Number.isFinite(width) || width <= 0) {
    width = maxX;
  }
  if (!Number.isFinite(height) || height <= 0) {
    height = maxY;
  }

  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    return null;
  }

  return { width, height, cells };
}

type GithubContributionGridProps = {
  username: string;
  className?: string;
  fallbackAlt: string;
  fallbackSrc: string;
};

export function GithubContributionGrid({
  username,
  className,
  fallbackAlt,
  fallbackSrc,
}: GithubContributionGridProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const scope = useRef<HTMLDivElement | null>(null);
  const revealStartedRef = useRef(false);
  const [data, setData] = useState<ParsedContribution | null>(null);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    revealStartedRef.current = false;
    setData(null);
    setIsUnavailable(false);
    setShouldLoad(false);
    setShouldAnimate(false);
  }, [username]);

  useEffect(() => {
    const node = shellRef.current;

    if (!node || !username) {
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      setShouldAnimate(true);
      return;
    }

    const preloadObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry?.isIntersecting) {
          return;
        }

        setShouldLoad(true);
        preloadObserver.disconnect();
      },
      { rootMargin: PRELOAD_ROOT_MARGIN },
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry?.isIntersecting) {
          return;
        }

        setShouldAnimate(true);
        revealObserver.disconnect();
      },
      { threshold: 0.2 },
    );

    if (!shouldLoad) {
      preloadObserver.observe(node);
    }

    if (!shouldAnimate) {
      revealObserver.observe(node);
    }

    return () => {
      preloadObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [shouldAnimate, shouldLoad, username]);

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    if (!username) {
      setIsUnavailable(true);
      setData(null);
      return;
    }

    const controller = new AbortController();

    async function load() {
      setIsUnavailable(false);

      try {
        const response = await fetch(
          `https://github-contributions-api.deno.dev/${encodeURIComponent(username)}.svg${CONTRIBUTION_API_PARAMS}`,
          {
            cache: "default",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const rawSvg = await response.text();
        const parsed = parseContributionSvg(rawSvg);

        if (controller.signal.aborted) {
          return;
        }

        if (!parsed) {
          setIsUnavailable(true);
          setData(null);
          return;
        }

        revealStartedRef.current = false;
        setData(parsed);
      } catch {
        if (controller.signal.aborted) {
          return;
        }

        setIsUnavailable(true);
        setData(null);
      }
    }

    void load();

    return () => {
      controller.abort();
    };
  }, [shouldLoad, username]);

  useGSAP(
    (_, contextSafe) => {
      if (!data) {
        return;
      }

      ensureGsap();

      const root = scope.current;
      if (!root) {
        return;
      }

      const cells = Array.from(
        root.querySelectorAll<HTMLDivElement>(".github-contrib-cell"),
      );
      const baseCells = Array.from(
        root.querySelectorAll<HTMLDivElement>(".github-contrib-cell__base"),
      );
      const regrowCells = Array.from(
        root.querySelectorAll<HTMLDivElement>(".github-contrib-cell__regrow"),
      );

      if (!cells.length || !baseCells.length || !regrowCells.length) {
        return;
      }

      let revealTimeline: gsap.core.Timeline | null = null;
      let cycleTimeline: gsap.core.Timeline | null = null;
      let ambientLoop: gsap.core.Tween | null = null;
      const makeContextSafe =
        contextSafe ??
        (<T extends (...args: never[]) => void>(callback: T) => callback);
      const resetLayerStack = (activeLayer: LayerName = "base") => {
        for (const cell of cells) {
          cell.dataset.activeLayer = activeLayer;
        }

        gsap.set(
          baseCells,
          activeLayer === "base" ? LAYER_VISIBLE_STATE : LAYER_HIDDEN_STATE,
        );
        gsap.set(
          regrowCells,
          activeLayer === "regrow" ? LAYER_VISIBLE_STATE : LAYER_HIDDEN_STATE,
        );
      };

      const clearTimers = () => {
        if (ambientLoop) {
          ambientLoop.kill();
          ambientLoop = null;
        }

        if (cycleTimeline) {
          cycleTimeline.kill();
          cycleTimeline = null;
        }

        if (revealTimeline) {
          revealTimeline.kill();
          revealTimeline = null;
        }

        gsap.killTweensOf(cells);
        gsap.killTweensOf(baseCells);
        gsap.killTweensOf(regrowCells);
      };

      const scheduleAmbientCycle = makeContextSafe((delaySeconds: number) => {
        if (ambientLoop) {
          ambientLoop.kill();
        }

        ambientLoop = gsap.delayedCall(delaySeconds, runAmbientCycle);
      });

      const runAmbientCycle = makeContextSafe(() => {
        const selected = gsap.utils
          .shuffle(cells.slice())
          .slice(0, randomInt(1, Math.min(6, cells.length)));
        const selectedSlots = resolveSelectedSlots(selected);

        if (!selectedSlots.length) {
          scheduleAmbientCycle(getAmbientDelaySeconds());
          return;
        }

        const visibleLayers = selectedSlots.map((slot) => slot.visibleLayer);
        const regrowLayers = selectedSlots.map((slot) => slot.regrowLayer);

        cycleTimeline?.kill();
        cycleTimeline = gsap.timeline({
          defaults: { overwrite: "auto" },
          onComplete: () => {
            scheduleAmbientCycle(getAmbientDelaySeconds());
          },
        });

        cycleTimeline
          .set(regrowLayers, LAYER_HIDDEN_STATE)
          .to(visibleLayers, {
            autoAlpha: 0,
            y: () => randomInt(30, 48),
            x: () => gsap.utils.random(-5, 5, 1),
            rotate: () => gsap.utils.random(-12, 12, 1),
            scaleY: 0.76,
            duration: AMBIENT_FALL_DURATION,
            ease: "power2.in",
            stagger: { each: AMBIENT_FALL_STAGGER, from: "random" },
          })
          .set(visibleLayers, {
            autoAlpha: 0,
            x: 0,
            y: 0,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            transformOrigin: CELL_TRANSFORM_ORIGIN,
          })
          .to(regrowLayers, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            duration: AMBIENT_REGROW_DURATION,
            ease: "power3.out",
            stagger: { each: AMBIENT_REGROW_STAGGER, from: "random" },
          }, `+=${AMBIENT_REGROW_DELAY}`)
          .call(() => {
            for (const slot of selectedSlots) {
              slot.cell.dataset.activeLayer = slot.nextActiveLayer;
            }
          });
      });

      const startAmbientLoop = makeContextSafe(() => {
        scheduleAmbientCycle(getAmbientDelaySeconds());
      });

      const revealGrid = makeContextSafe(() => {
        if (revealStartedRef.current) {
          return;
        }

        revealStartedRef.current = true;
        revealTimeline?.kill();
        revealTimeline = gsap.timeline({
          defaults: { overwrite: "auto" },
          onComplete: startAmbientLoop,
        });

        gsap.set(cells, REVEAL_START_STATE);
        resetLayerStack();

        revealTimeline.to(cells, {
          autoAlpha: 1,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          duration: REVEAL_DURATION,
          ease: "power2.out",
          stagger: { amount: REVEAL_STAGGER_AMOUNT, from: "random" },
        });
      });

      const cleanup = withMotionPreference({
        reduce: () => {
          clearTimers();
          revealStartedRef.current = true;
          gsap.set(cells, LAYER_VISIBLE_STATE);
          resetLayerStack();
        },
        motion: () => {
          clearTimers();

          if (!shouldAnimate) {
            revealStartedRef.current = false;
            gsap.set(cells, REVEAL_START_STATE);
            resetLayerStack();
            return;
          }

          revealGrid();
        },
      });

      return () => {
        clearTimers();
        cleanup();
      };
    },
    { scope, dependencies: [data, shouldAnimate], revertOnUpdate: true },
  );

  if (isUnavailable) {
    return (
      <div ref={shellRef} className="github-contrib-shell">
        {/* Remote SVG fallback; next/image provides no meaningful benefit here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fallbackSrc}
          alt={fallbackAlt}
          className={`block w-full opacity-90 ${className ?? ""}`.trim()}
          loading="lazy"
        />
      </div>
    );
  }

  const cellScaleX = data ? 100 / data.width : 0;
  const cellScaleY = data ? 100 / data.height : 0;

  return (
    <div ref={shellRef} className="github-contrib-shell">
      {data ? (
        <div
          ref={scope}
          className={`github-contrib-grid ${className ?? ""}`.trim()}
          style={{ aspectRatio: `${data.width} / ${data.height}` }}
        >
          {data.cells.map((cell) => (
            <div
              key={cell.key}
              className="github-contrib-cell"
              style={{
                left: `${cell.x * cellScaleX}%`,
                top: `${cell.y * cellScaleY}%`,
                width: `${cell.width * cellScaleX}%`,
                height: `${cell.height * cellScaleY}%`,
              }}
            >
              <div
                className="github-contrib-cell__base"
                style={{ backgroundColor: cell.fill }}
              />
              <div
                className="github-contrib-cell__regrow"
                style={{ backgroundColor: cell.fill }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`github-contrib-grid github-contrib-grid--placeholder ${className ?? ""}`.trim()}
          style={{ aspectRatio: DEFAULT_GRAPH_ASPECT_RATIO }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
