import React from "react";

export default function Insuranceprovider() {
  return (
    <section className="max-w-6xl mx-auto mt-10 mb-20 p-6 md:p-10 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl md:text-3xl font-extrabold text-purple-700 mb-4">
        🤰 Your Guide to Maternal Benefits
      </h1>
      <p className="text-slate-600 mb-8">
        A clear summary of what's covered so you can plan for a safe pregnancy
        and delivery.
      </p>

      {/* --- Comprehensive Delivery --- */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-purple-800 mb-3">
          1. Comprehensive Delivery Services (Inpatient Care)
        </h2>
        <p className="text-slate-600 mb-4">
          Your benefits cover the full process of childbirth, including
          complications and necessary medical support.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border border-slate-200 text-left">
            <thead className="bg-purple-100">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-800">
                  Service Covered
                </th>
                <th className="px-4 py-3 font-medium text-slate-800">
                  Included Benefits
                </th>
                <th className="px-4 py-3 font-medium text-slate-800">
                  Tariff/Cost Covered
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="px-4 py-3 font-medium">Normal Delivery</td>
                <td className="px-4 py-3 text-slate-600">
                  Midwifery, essential newborn care, post-delivery care, ward
                  charges, meals.
                </td>
                <td className="px-4 py-3 text-purple-700 font-semibold">
                  KES 11,200
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Assisted Delivery</td>
                <td className="px-4 py-3 text-slate-600">
                  Same comprehensive care as normal delivery.
                </td>
                <td className="px-4 py-3 text-purple-700 font-semibold">
                  KES 11,200
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">
                  Caesarean Section (C-Section)
                </td>
                <td className="px-4 py-3 text-slate-600">
                  Operating & recovery room, newborn care, complication
                  management.
                </td>
                <td className="px-4 py-3 text-purple-700 font-semibold">
                  KES 32,600
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul className="mt-4 space-y-2 text-slate-600 text-sm">
          <li>
            <strong>Inpatient Stay:</strong> Up to 48 hours (normal) / 72 hours
            (C-Section).
          </li>
          <li>
            <strong>Complication Management:</strong> Postpartum infections,
            haemorrhage, birth traumas.
          </li>
          <li>
            <strong>Medical Supplies:</strong> Medicines, blood, oxygen, and
            essential consumables.
          </li>
          <li>
            <strong>Rhesus-Negative Mothers:</strong> Anti-D serum covered (may
            need pre-authorization).
          </li>
        </ul>
      </div>

      {/* --- ANC & PNC --- */}
      <div>
        <h2 className="text-xl font-semibold text-purple-800 mb-3">
          2. Antenatal and Postnatal Care (Outpatient)
        </h2>
        <p className="text-slate-600 mb-4">
          Routine checkups and follow-up care are covered under your primary
          healthcare benefits.
        </p>

        <div className="border border-slate-200 rounded-lg p-4 bg-purple-50">
          <h3 className="font-medium text-slate-800 mb-2">
            Included Services:
          </h3>
          <ul className="list-disc list-inside text-slate-700 text-sm space-y-1">
            <li>Consultation and diagnosis</li>
            <li>Lab investigations & basic ultrasounds</li>
            <li>Prescription and drug dispensing</li>
            <li>Postnatal follow-ups and family planning</li>
          </ul>
          <p className="text-xs text-slate-500 mt-2">
            Access at Primary Health Care facilities (Levels 2 & 3).
          </p>
        </div>

        <h3 className="mt-6 font-semibold text-purple-800">
          ✅ Action Steps for Expecting Mothers
        </h3>
        <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1 mt-2">
          <li>
            <strong>Register:</strong> Ensure your household is mapped to a
            Primary Care Network (PCN).
          </li>
          <li>
            <strong>Verify:</strong> Confirm services are covered before
            treatment.
          </li>
          <li>
            <strong>Know your limits:</strong> Tariffs are maximums; extra stay
            may incur daily charges.
          </li>
        </ol>
      </div>

      <footer className="mt-10 border-t border-slate-200 pt-4 text-sm text-slate-500 text-center">
        © 2025 Mama Care · This summary is based on the Social Health Insurance
        tariffs.
      </footer>
    </section>
  );
}
