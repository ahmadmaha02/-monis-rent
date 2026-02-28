"use client";

import { useMemo, useState } from "react";

type DeskOption = {
  id: string;
  name: string;
  vibe: string;
  monthly: number;
  topTone: string;
  frameTone: string;
  info: string;
};

type ChairOption = {
  id: string;
  name: string;
  support: string;
  monthly: number;
  backTone: string;
  seatTone: string;
  wheelTone: string;
};

type AccessoryId = "monitor" | "lamp" | "plant" | "drawer" | "speaker";

type AccessoryOption = {
  id: AccessoryId;
  name: string;
  info: string;
  monthly: number;
  max: number;
};

type TabId = "desk" | "chair" | "accessories";

const TABS: { id: TabId; label: string }[] = [
  { id: "desk", label: "Desks" },
  { id: "chair", label: "Chairs" },
  { id: "accessories", label: "Accessories" },
];

const DESKS: DeskOption[] = [
  {
    id: "sunrise-slab",
    name: "Sunrise Slab Desk",
    vibe: "Warm oak finish",
    monthly: 420_000,
    topTone: "bg-gradient-to-r from-amber-200 to-orange-200",
    frameTone: "bg-gradient-to-b from-amber-50 to-orange-100",
    info: "160cm desk with soft edges and cable management.",
  },
  {
    id: "reef-pro",
    name: "Reef Pro Standing Desk",
    vibe: "Height adjustable",
    monthly: 560_000,
    topTone: "bg-gradient-to-r from-slate-200 to-zinc-100",
    frameTone: "bg-gradient-to-b from-zinc-100 to-slate-200",
    info: "Electric standing mode for deep-work and meetings.",
  },
  {
    id: "island-compact",
    name: "Island Compact Desk",
    vibe: "Small-space friendly",
    monthly: 360_000,
    topTone: "bg-gradient-to-r from-emerald-100 to-teal-100",
    frameTone: "bg-gradient-to-b from-emerald-50 to-teal-100",
    info: "120cm profile, ideal for apartment and villa corners.",
  },
];

const CHAIRS: ChairOption[] = [
  {
    id: "cloud-ergo",
    name: "Cloud Ergo Chair",
    support: "Lumbar + headrest",
    monthly: 230_000,
    backTone: "bg-gradient-to-b from-slate-200 to-slate-300",
    seatTone: "bg-gradient-to-b from-slate-100 to-slate-200",
    wheelTone: "bg-slate-500",
  },
  {
    id: "drift-mesh",
    name: "Drift Mesh Chair",
    support: "Breathable mesh back",
    monthly: 190_000,
    backTone: "bg-gradient-to-b from-cyan-200 to-sky-300",
    seatTone: "bg-gradient-to-b from-cyan-100 to-sky-200",
    wheelTone: "bg-sky-500",
  },
  {
    id: "nomad-pro",
    name: "Nomad Pro Chair",
    support: "4D armrest",
    monthly: 260_000,
    backTone: "bg-gradient-to-b from-emerald-200 to-teal-300",
    seatTone: "bg-gradient-to-b from-emerald-100 to-teal-200",
    wheelTone: "bg-teal-600",
  },
];

const ACCESSORIES: AccessoryOption[] = [
  {
    id: "monitor",
    name: '27" Monitor',
    info: "Ultra-clear display",
    monthly: 170_000,
    max: 3,
  },
  {
    id: "lamp",
    name: "Desk Lamp",
    info: "Warm focus lighting",
    monthly: 75_000,
    max: 1,
  },
  {
    id: "plant",
    name: "Desktop Plant",
    info: "Bring Bali green indoors",
    monthly: 35_000,
    max: 2,
  },
  {
    id: "drawer",
    name: "Storage Drawer",
    info: "Hide cables and notes",
    monthly: 80_000,
    max: 1,
  },
  {
    id: "speaker",
    name: "Studio Speaker",
    info: "Pair of compact speakers",
    monthly: 65_000,
    max: 1,
  },
];

const DEFAULT_ACCESSORIES: Record<AccessoryId, number> = {
  monitor: 1,
  lamp: 1,
  plant: 0,
  drawer: 0,
  speaker: 0,
};

const MONITOR_POSITIONS = [
  "left-[22%] -rotate-1",
  "left-1/2 -translate-x-1/2",
  "right-[22%] rotate-1",
] as const;

const PLANT_POSITIONS = ["left-[17%]", "right-[18%]"] as const;

function money(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("desk");
  const [selectedDeskId, setSelectedDeskId] = useState(DESKS[0].id);
  const [selectedChairId, setSelectedChairId] = useState(CHAIRS[0].id);
  const [duration, setDuration] = useState(3);
  const [accessoryCounts, setAccessoryCounts] =
    useState<Record<AccessoryId, number>>(DEFAULT_ACCESSORIES);

  const selectedDesk =
    DESKS.find((desk) => desk.id === selectedDeskId) ?? DESKS[0];
  const selectedChair =
    CHAIRS.find((chair) => chair.id === selectedChairId) ?? CHAIRS[0];

  const selectedAccessories = ACCESSORIES.filter(
    ({ id }) => accessoryCounts[id] > 0,
  );

  const accessorySubtotal = ACCESSORIES.reduce(
    (total, item) => total + item.monthly * accessoryCounts[item.id],
    0,
  );

  const monthlySubtotal =
    selectedDesk.monthly + selectedChair.monthly + accessorySubtotal;
  const serviceFee = Math.round(monthlySubtotal * 0.08);
  const monthlyTotal = monthlySubtotal + serviceFee;
  const totalForDuration = monthlyTotal * duration;

  const readyDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 4);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
    }).format(date);
  }, []);

  const updateAccessory = (id: AccessoryId, delta: number) => {
    setAccessoryCounts((current) => {
      const definition = ACCESSORIES.find((item) => item.id === id);

      if (!definition) {
        return current;
      }

      const nextCount = Math.max(
        0,
        Math.min(definition.max, current[id] + delta),
      );

      return {
        ...current,
        [id]: nextCount,
      };
    });
  };

  return (
    <div className="min-h-screen px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="glass-panel animate-reveal rounded-[30px] px-6 py-6 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="inline-flex items-center rounded-full bg-amber-200/70 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-slate-700 uppercase">
                monis.rent workspace lab
              </p>
              <h1 className="text-3xl leading-tight font-bold text-slate-900 sm:text-4xl lg:text-5xl">
                Design Your Workspace in Bali
              </h1>
              <p className="max-w-2xl text-sm text-slate-700 sm:text-base">
                Pick your desk, match a chair, add accessories, and rent a setup
                that can be delivered next week.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-300/70 bg-amber-100/80 px-4 py-3 text-right">
              <p className="text-xs font-semibold tracking-wide text-slate-700 uppercase">
                Setup readiness
              </p>
              <p className="text-lg font-bold text-slate-900">{readyDate}</p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
          <section className="space-y-6">
            <div className="glass-panel soft-grid animate-reveal relative overflow-hidden rounded-[30px] px-5 py-6 sm:px-7">
              <div className="absolute -top-16 left-8 h-40 w-40 rounded-full bg-amber-200/45 blur-2xl" />
              <div className="absolute -right-8 top-12 h-32 w-32 rounded-full bg-teal-200/35 blur-2xl" />
              <p className="relative text-sm font-semibold tracking-[0.1em] text-slate-600 uppercase">
                Live Preview
              </p>
              <div className="relative mt-4 h-[440px] overflow-hidden rounded-[24px] border border-white/60 bg-gradient-to-b from-white/90 via-slate-50/85 to-slate-100/85">
                <div className="absolute inset-x-8 top-0 h-24 bg-gradient-to-b from-white/50 to-transparent" />
                <div className="absolute bottom-5 left-1/2 h-28 w-[84%] -translate-x-1/2 rounded-[100%] bg-slate-800/12 blur-lg" />
                <div className="absolute inset-x-0 bottom-0 h-[35%] rounded-t-[45%] bg-gradient-to-b from-slate-100/55 to-slate-200/75" />

                <div className="absolute bottom-3 left-1/2 z-[60] -translate-x-1/2">
                  <div
                    className={classNames(
                      "mx-auto h-24 w-20 rounded-t-[44px] border border-slate-700/28",
                      selectedChair.backTone,
                    )}
                  />
                  <div className="mx-auto -mt-2 h-9 w-24 rounded-full border border-white/75 bg-white/75 shadow-[0_6px_14px_-11px_rgba(15,23,42,0.65)]" />
                  <div
                    className={classNames(
                      "-mt-3 h-12 w-28 rounded-[32px] border border-slate-700/24",
                      selectedChair.seatTone,
                    )}
                  />
                  <div className="mx-auto mt-2 h-8 w-[3px] bg-slate-700/45" />
                  <div className="-mt-1 flex items-center justify-center gap-4">
                    <span
                      className={classNames(
                        "h-5 w-5 rounded-full",
                        selectedChair.wheelTone,
                      )}
                    />
                    <span
                      className={classNames(
                        "h-5 w-5 rounded-full",
                        selectedChair.wheelTone,
                      )}
                    />
                    <span
                      className={classNames(
                        "h-5 w-5 rounded-full",
                        selectedChair.wheelTone,
                      )}
                    />
                  </div>
                </div>

                <div className="absolute bottom-[92px] left-1/2 z-20 w-[min(86%,680px)] -translate-x-1/2">
                  <div
                    className={classNames(
                      "h-7 rounded-t-[16px] border border-slate-700/28 shadow-[0_10px_16px_-14px_rgba(15,23,42,0.85)]",
                      selectedDesk.topTone,
                    )}
                  />
                  <div className="relative h-[126px]">
                    <div
                      className={classNames(
                        "absolute left-4 top-0 h-full w-20 rounded-b-2xl border border-slate-700/20",
                        selectedDesk.frameTone,
                      )}
                    />
                    <div
                      className={classNames(
                        "absolute right-4 top-0 h-full w-20 rounded-b-2xl border border-slate-700/20",
                        selectedDesk.frameTone,
                      )}
                    />
                    <div
                      className={classNames(
                        "absolute left-1/2 top-0 h-full w-16 -translate-x-1/2 rounded-b-2xl border border-slate-700/15",
                        selectedDesk.frameTone,
                      )}
                    />

                    {accessoryCounts.drawer > 0 && (
                      <div className="absolute right-[16%] top-2 h-11 w-20 rounded-lg border border-slate-700/30 bg-white/78 shadow-sm">
                        <div className="absolute left-1/2 top-3 h-[2px] w-9 -translate-x-1/2 bg-slate-500/65" />
                        <div className="absolute left-1/2 top-7 h-[2px] w-9 -translate-x-1/2 bg-slate-500/65" />
                      </div>
                    )}
                  </div>
                </div>

                {Array.from({ length: accessoryCounts.monitor }).map(
                  (_, index) => (
                    <div
                      key={`monitor-${index}`}
                      className={classNames(
                        "absolute bottom-[238px] z-30 h-20 w-28 rounded-lg border border-slate-700/35 bg-gradient-to-b from-slate-800 to-slate-600 p-1.5 shadow-md",
                        MONITOR_POSITIONS[index],
                      )}>
                      <div className="h-full w-full rounded-md border border-slate-200/25 bg-gradient-to-br from-cyan-100/35 via-indigo-100/20 to-slate-900/20" />
                      <div className="absolute -bottom-5 left-1/2 h-5 w-1.5 -translate-x-1/2 rounded-b bg-slate-500" />
                      <div className="absolute -bottom-6 left-1/2 h-2 w-10 -translate-x-1/2 rounded-full bg-slate-500/90" />
                    </div>
                  ),
                )}

                {accessoryCounts.speaker > 0 && (
                  <>
                    <div className="absolute bottom-[214px] left-[30%] z-[26] h-11 w-8 rounded-lg border border-slate-700/35 bg-slate-200/85">
                      <div className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-500" />
                      <div className="absolute left-1/2 top-5 h-3 w-3 -translate-x-1/2 rounded-full border border-slate-500/80" />
                    </div>
                    <div className="absolute bottom-[214px] right-[30%] z-[26] h-11 w-8 rounded-lg border border-slate-700/35 bg-slate-200/85">
                      <div className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-500" />
                      <div className="absolute left-1/2 top-5 h-3 w-3 -translate-x-1/2 rounded-full border border-slate-500/80" />
                    </div>
                  </>
                )}

                {Array.from({ length: accessoryCounts.plant }).map(
                  (_, index) => (
                    <div
                      key={`plant-${index}`}
                      className={classNames(
                        "absolute bottom-[220px] z-[27] h-16 w-14",
                        PLANT_POSITIONS[index],
                      )}>
                      <div className="absolute bottom-0 left-1 h-6 w-12 rounded-b-xl rounded-t-md bg-gradient-to-b from-amber-500 to-amber-700" />
                      <div className="absolute bottom-4 left-[26px] h-9 w-[3px] rounded bg-emerald-700" />
                      <div className="absolute bottom-7 left-2 h-6 w-3 rotate-[-24deg] rounded-full bg-emerald-500" />
                      <div className="absolute bottom-9 left-[22px] h-6 w-3 rounded-full bg-emerald-500" />
                      <div className="absolute bottom-7 left-8 h-6 w-3 rotate-[20deg] rounded-full bg-emerald-500" />
                    </div>
                  ),
                )}

                {accessoryCounts.lamp > 0 && (
                  <div className="absolute right-[15%] bottom-[214px] z-40 h-28 w-24 animate-float">
                    <div className="absolute bottom-0 right-3 h-2 w-16 rounded-full bg-slate-500/80" />
                    <div className="absolute right-9 bottom-2 h-14 w-[3px] bg-slate-600/80" />
                    <div className="absolute right-9 bottom-[58px] h-[3px] w-10 origin-left rotate-[-26deg] bg-slate-600/80" />
                    <div className="absolute right-[41px] bottom-[67px] h-6 w-8 -rotate-12 rounded-t-lg rounded-b-md border border-slate-600/70 bg-amber-200/90" />
                    <div className="absolute right-[26px] bottom-[52px] h-12 w-12 rounded-full bg-amber-200/40 blur-lg" />
                  </div>
                )}
              </div>
            </div>

            <div className="glass-panel animate-reveal rounded-[30px] p-4 sm:p-6">
              <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100/80 p-2">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={classNames(
                      "rounded-xl px-4 py-2 text-sm font-semibold transition",
                      activeTab === tab.id
                        ? "bg-slate-900 text-white shadow"
                        : "text-slate-700 hover:bg-white",
                    )}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === "desk" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {DESKS.map((desk) => {
                    const isSelected = desk.id === selectedDeskId;

                    return (
                      <article
                        key={desk.id}
                        className={classNames(
                          "card-lift rounded-2xl border p-4",
                          isSelected
                            ? "border-teal-500 bg-teal-50/70"
                            : "border-slate-200 bg-white/75",
                        )}>
                        <div
                          className={classNames(
                            "h-3 rounded-full",
                            desk.topTone,
                          )}
                        />
                        <h3 className="mt-3 text-lg font-semibold">
                          {desk.name}
                        </h3>
                        <p className="text-sm text-slate-600">{desk.vibe}</p>
                        <p className="mt-2 text-xs text-slate-500">
                          {desk.info}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="font-semibold text-slate-900">
                            {money(desk.monthly)}/mo
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedDeskId(desk.id)}
                            className={classNames(
                              "rounded-lg px-3 py-1.5 text-sm font-semibold",
                              isSelected
                                ? "bg-slate-900 text-white"
                                : "bg-slate-200 text-slate-800 hover:bg-slate-300",
                            )}>
                            {isSelected ? "Selected" : "Choose"}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {activeTab === "chair" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {CHAIRS.map((chair) => {
                    const isSelected = chair.id === selectedChairId;

                    return (
                      <article
                        key={chair.id}
                        className={classNames(
                          "card-lift rounded-2xl border p-4",
                          isSelected
                            ? "border-teal-500 bg-teal-50/70"
                            : "border-slate-200 bg-white/75",
                        )}>
                        <div className="flex items-center gap-2">
                          <span
                            className={classNames(
                              "h-3 w-8 rounded-full",
                              chair.backTone,
                            )}
                          />
                          <span
                            className={classNames(
                              "h-3 w-8 rounded-full",
                              chair.seatTone,
                            )}
                          />
                        </div>
                        <h3 className="mt-3 text-lg font-semibold">
                          {chair.name}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {chair.support}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="font-semibold text-slate-900">
                            {money(chair.monthly)}/mo
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedChairId(chair.id)}
                            className={classNames(
                              "rounded-lg px-3 py-1.5 text-sm font-semibold",
                              isSelected
                                ? "bg-slate-900 text-white"
                                : "bg-slate-200 text-slate-800 hover:bg-slate-300",
                            )}>
                            {isSelected ? "Selected" : "Choose"}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {activeTab === "accessories" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {ACCESSORIES.map((item) => {
                    const count = accessoryCounts[item.id];

                    return (
                      <article
                        key={item.id}
                        className="card-lift rounded-2xl border border-slate-200 bg-white/80 p-4">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-sm text-slate-600">{item.info}</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {money(item.monthly)}/mo
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => updateAccessory(item.id, 1)}
                            disabled={count >= item.max}
                            className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-35">
                            Add
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateAccessory(item.id, -1)}
                              disabled={count === 0}
                              className="h-8 w-8 rounded-lg border border-slate-300 text-lg leading-none disabled:cursor-not-allowed disabled:opacity-35">
                              -
                            </button>
                            <span className="w-5 text-center font-semibold">
                              {count}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateAccessory(item.id, 1)}
                              disabled={count >= item.max}
                              className="h-8 w-8 rounded-lg border border-slate-300 text-lg leading-none disabled:cursor-not-allowed disabled:opacity-35">
                              +
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          <aside className="glass-panel animate-reveal rounded-[30px] p-5 sm:p-6 xl:sticky xl:top-5 xl:h-fit">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Checkout Setup</h2>
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800 uppercase">
                Live summary
              </span>
            </div>

            <div className="mt-4 space-y-3 rounded-2xl border border-slate-200/80 bg-white/70 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Desk</span>
                <span className="font-semibold">{selectedDesk.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Chair</span>
                <span className="font-semibold">{selectedChair.name}</span>
              </div>
              <div className="border-t border-dashed border-slate-300 pt-3">
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Accessories
                </p>
                {selectedAccessories.length > 0 ? (
                  <ul className="mt-2 space-y-2 text-sm">
                    {selectedAccessories.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between">
                        <span className="text-slate-700">
                          {item.name} x {accessoryCounts[item.id]}
                        </span>
                        <span className="font-medium text-slate-900">
                          {money(item.monthly * accessoryCounts[item.id])}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">
                    No accessories selected yet.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white/70 p-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="duration"
                  className="text-sm font-semibold text-slate-700">
                  Rental duration
                </label>
                <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
                  {duration} months
                </span>
              </div>
              <input
                id="duration"
                type="range"
                min={1}
                max={12}
                step={1}
                value={duration}
                onChange={(event) => setDuration(Number(event.target.value))}
                className="mt-3 w-full accent-teal-600"
              />
            </div>

            <div className="mt-5 space-y-2 rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Monthly subtotal</span>
                <span className="font-semibold">{money(monthlySubtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Service and setup fee</span>
                <span className="font-semibold">{money(serviceFee)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-slate-300 pt-2">
                <span className="text-base font-semibold text-slate-900">
                  Total / month
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {money(monthlyTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-slate-300 pt-2">
                <span className="text-base font-semibold text-slate-900">
                  Total {duration} month{duration > 1 ? "s" : ""}
                </span>
                <span className="text-lg font-bold text-teal-700">
                  {money(totalForDuration)}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="animate-glow mt-5 w-full rounded-2xl bg-slate-900 px-5 py-4 text-base font-bold text-white transition hover:bg-slate-700">
              Rent My Setup
            </button>

            <p className="mt-3 text-center text-xs text-slate-600">
              Delivery areas: Canggu, Ubud, Seminyak, and Denpasar.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
