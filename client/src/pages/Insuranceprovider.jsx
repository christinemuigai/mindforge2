import React, { useMemo, useState } from "react";

const providers = [
  {
    id: "sha",
    name: "Social Health Authority (SHA)",
    type: "Public Cover",
    badge: "Government",
    summary:
      "Baseline public maternal cover for registered Kenyans, especially useful for public and contracted facilities.",
    bestFor: "Affordable essential maternity care",
    maternityCover: "Basic",
    hospitals: "Mainly public / contracted facilities",
    waitingPeriod: "Depends on active registration and eligibility",
    delivery: true,
    cSection: true,
    antenatal: true,
    postnatal: true,
    newborn: true,
    emergency: true,
    color: "bg-emerald-50 border-emerald-200",
    button: "bg-emerald-600 hover:bg-emerald-700",
    details: [
      "Antenatal and postnatal maternal services",
      "Normal delivery support",
      "Caesarean section support",
      "Useful as a foundation cover before adding private insurance",
    ],
    note:
      "Best for essential maternal care, but users should still confirm hospital acceptance and current limits before treatment.",
  },
  {
    id: "jubilee",
    name: "Jubilee Insurance",
    type: "Private Cover",
    badge: "Popular",
    summary:
      "Private medical plans with maternity as part of broader family or individual health cover.",
    bestFor: "Users seeking wider hospital options",
    maternityCover: "Comprehensive",
    hospitals: "Broad private network",
    waitingPeriod: "Usually applies for maternity benefits",
    delivery: true,
    cSection: true,
    antenatal: true,
    postnatal: true,
    newborn: true,
    emergency: true,
    color: "bg-purple-50 border-purple-200",
    button: "bg-purple-700 hover:bg-purple-800",
    details: [
      "Family and individual medical plans",
      "Maternity care under selected plans",
      "Outpatient and inpatient options",
      "Emergency and specialist support depending on plan tier",
    ],
    note:
      "Good for users who want stronger private hospital access and broader family cover.",
  },
  {
    id: "aar",
    name: "AAR Insurance",
    type: "Private Cover",
    badge: "Private Network",
    summary:
      "Known for medical cover options with strong outpatient and private care access.",
    bestFor: "Urban users wanting private hospital convenience",
    maternityCover: "Moderate to comprehensive",
    hospitals: "Private panel access",
    waitingPeriod: "Usually applies",
    delivery: true,
    cSection: true,
    antenatal: true,
    postnatal: true,
    newborn: true,
    emergency: true,
    color: "bg-sky-50 border-sky-200",
    button: "bg-sky-700 hover:bg-sky-800",
    details: [
      "Maternal care under selected health plans",
      "Antenatal and postnatal support",
      "Delivery and surgery cover based on benefit limits",
      "Useful for users prioritizing convenience and private facilities",
    ],
    note:
      "Strong option for users who want private care, but cover level depends heavily on plan selected.",
  },
  {
    id: "britam",
    name: "Britam",
    type: "Private Cover",
    badge: "Family Plans",
    summary:
      "Family-oriented health plans that can include maternity support under inpatient medical cover.",
    bestFor: "Families comparing mid-tier private options",
    maternityCover: "Moderate to comprehensive",
    hospitals: "Private and selected partner hospitals",
    waitingPeriod: "Usually applies",
    delivery: true,
    cSection: true,
    antenatal: true,
    postnatal: true,
    newborn: true,
    emergency: true,
    color: "bg-amber-50 border-amber-200",
    button: "bg-amber-600 hover:bg-amber-700",
    details: [
      "Maternal cover depends on chosen plan and limits",
      "Suitable for family medical cover setups",
      "Can work well as a SHA + private combo option",
      "Better for users who want broader private protection",
    ],
    note:
      "A decent mid-tier private option for families who want more than public-only maternal care.",
  },
  {
    id: "apa",
    name: "APA Insurance",
    type: "Private Cover",
    badge: "Flexible",
    summary:
      "Health plans that can include maternity benefits and broader family care support.",
    bestFor: "Users comparing flexible family covers",
    maternityCover: "Moderate",
    hospitals: "Panel-based private access",
    waitingPeriod: "Usually applies",
    delivery: true,
    cSection: true,
    antenatal: true,
    postnatal: true,
    newborn: true,
    emergency: false,
    color: "bg-rose-50 border-rose-200",
    button: "bg-rose-600 hover:bg-rose-700",
    details: [
      "Family-focused medical protection",
      "Maternity depends on product selected",
      "Useful for users comparing affordability vs private access",
      "Should be checked plan by plan for actual maternity limits",
    ],
    note:
      "Worth listing in the app, but users need plan-specific confirmation before relying on it for delivery.",
  },
  {
    id: "oldmutual",
    name: "Old Mutual",
    type: "Private Cover",
    badge: "Full Family",
    summary:
      "Broader family medical insurance that may include maternity and hospitalization support.",
    bestFor: "Families wanting wider health protection",
    maternityCover: "Comprehensive",
    hospitals: "Private hospital access",
    waitingPeriod: "Usually applies",
    delivery: true,
    cSection: true,
    antenatal: true,
    postnatal: true,
    newborn: true,
    emergency: true,
    color: "bg-indigo-50 border-indigo-200",
    button: "bg-indigo-700 hover:bg-indigo-800",
    details: [
      "Family-oriented health insurance structure",
      "Hospitalization plus maternity under selected plans",
      "Good candidate for users seeking broader non-maternity benefits too",
      "Better fit for households buying long-term medical cover",
    ],
    note:
      "More of a full-family insurance option than a maternity-only product.",
  },
];

function Tick({ value }) {
  return (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
        value
          ? "bg-green-100 text-green-700"
          : "bg-slate-100 text-slate-400"
      }`}
    >
      {value ? "✓" : "—"}
    </span>
  );
}

export default function Insuranceprovider() {
  const [selectedId, setSelectedId] = useState("sha");

  const selectedProvider = useMemo(
    () => providers.find((p) => p.id === selectedId) || providers[0],
    [selectedId]
  );

  return (
    <section className="max-w-7xl mx-auto mt-10 mb-20 px-4 md:px-6">
      <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-10 py-8 border-b border-slate-200 bg-gradient-to-r from-purple-50 via-white to-pink-50">
          <h1 className="text-2xl md:text-4xl font-extrabold text-purple-700 mb-3">
            🤰 Maternal Insurance Covers Available in Kenya
          </h1>
          <p className="text-slate-600 max-w-3xl">
            Compare real health cover options that Kenyan mothers may use for
            antenatal care, delivery, C-section support, and postnatal services.
            Use this as a guide, then verify hospital network, waiting period,
            and maternity limits before choosing a policy.
          </p>
        </div>

        {/* Provider cards */}
        <div className="px-6 md:px-10 py-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800">
              Choose a Provider
            </h2>
            <span className="text-sm text-slate-500">
              Public + private comparison
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {providers.map((provider) => {
              const active = selectedId === provider.id;

              return (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => setSelectedId(provider.id)}
                  className={`text-left border rounded-2xl p-5 transition-all ${
                    provider.color
                  } ${
                    active
                      ? "ring-2 ring-purple-500 shadow-lg scale-[1.01]"
                      : "hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                        {provider.type}
                      </p>
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {provider.name}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200">
                      {provider.badge}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-4">
                    {provider.summary}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Best for</span>
                      <span className="font-medium text-slate-800 text-right">
                        {provider.bestFor}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Maternity cover</span>
                      <span className="font-medium text-slate-800">
                        {provider.maternityCover}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-500">Waiting period</span>
                      <span className="font-medium text-slate-800 text-right">
                        {provider.waitingPeriod}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <span
                      className={`inline-flex items-center rounded-xl px-4 py-2 text-white text-sm font-semibold ${provider.button}`}
                    >
                      {active ? "Selected Provider" : "View Details"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="px-6 md:px-10 pb-8">
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800">
                Maternal Cover Comparison
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Fast side-by-side comparison of common maternal care needs.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      Provider
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      Antenatal
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      Delivery
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      C-Section
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      Postnatal
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      Newborn
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      Emergency
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      Hospital Access
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {providers.map((provider) => (
                    <tr
                      key={provider.id}
                      className={
                        selectedId === provider.id ? "bg-purple-50/60" : ""
                      }
                    >
                      <td className="px-4 py-4">
                        <div className="font-semibold text-slate-900">
                          {provider.name}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {provider.type}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Tick value={provider.antenatal} />
                      </td>
                      <td className="px-4 py-4">
                        <Tick value={provider.delivery} />
                      </td>
                      <td className="px-4 py-4">
                        <Tick value={provider.cSection} />
                      </td>
                      <td className="px-4 py-4">
                        <Tick value={provider.postnatal} />
                      </td>
                      <td className="px-4 py-4">
                        <Tick value={provider.newborn} />
                      </td>
                      <td className="px-4 py-4">
                        <Tick value={provider.emergency} />
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">
                        {provider.hospitals}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Selected Provider Details */}
        <div className="px-6 md:px-10 pb-10">
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-6 py-5 bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white">
              <p className="text-sm opacity-90 mb-1">Selected Provider</p>
              <h2 className="text-2xl font-extrabold">
                {selectedProvider.name}
              </h2>
              <p className="mt-2 text-sm md:text-base text-white/90 max-w-3xl">
                {selectedProvider.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
              <div className="lg:col-span-2">
                <h3 className="text-lg font-bold text-slate-800 mb-3">
                  What to expect
                </h3>
                <ul className="space-y-3">
                  {selectedProvider.details.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-700"
                    >
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">
                    Important note
                  </h4>
                  <p className="text-sm text-amber-900">
                    {selectedProvider.note}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500 mb-1">Cover Type</p>
                  <p className="font-semibold text-slate-900">
                    {selectedProvider.type}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500 mb-1">Best For</p>
                  <p className="font-semibold text-slate-900">
                    {selectedProvider.bestFor}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500 mb-1">Hospital Access</p>
                  <p className="font-semibold text-slate-900">
                    {selectedProvider.hospitals}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500 mb-1">Waiting Period</p>
                  <p className="font-semibold text-slate-900">
                    {selectedProvider.waitingPeriod}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 md:px-10 py-5 border-t border-slate-200 text-sm text-slate-500 text-center">
          Mama Care · Compare public and private maternal insurance options in
          Kenya. Always confirm current maternity limits, hospital panels, and
          waiting periods with the insurer before making care decisions.
        </footer>
      </div>
    </section>
  );
}