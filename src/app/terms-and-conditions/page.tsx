"use client";

export default function TermsAndConditions() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      <div className="bg-white/90 backdrop-blur-lg rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <div className="flex justify-center items-center min-h-[200px]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#009688] text-center">
            Terms & Conditions
          </h1>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#009688] mb-3 sm:mb-4">
              1. Booking & Check-In
            </h2>
            <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-sm sm:text-base">
              <li>Check-in time: 12:00 PM</li>
              <li>Check-out time: 11:00 AM</li>
              <li>
                All guests must present a valid government-issued photo ID at
                the time of check-in.
              </li>
              <li>
                Early check-in or late check-out is subject to availability and
                may incur additional charges.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#009688] mb-4">
              2. Reservation Policy
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                Reservations are confirmed only upon receipt of advance payment.
              </li>
              <li>
                Full refund for cancellations made at least 48 hours prior to
                check-in.
              </li>
              <li>
                No-shows or late cancellations (less than 48 hours before
                check-in) may be charged one night's stay.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#009688] mb-4">
              3. Payment
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>We accept cash, UPI, and major credit/debit cards.</li>
              <li>
                Full payment is required at check-in, unless otherwise agreed in
                writing.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#009688] mb-4">
              4. Guest Responsibility
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                Guests are responsible for their personal belongings during
                their stay.
              </li>
              <li>
                Any damages to hotel property or missing items will be charged
                to the guest's account.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#009688] mb-4">
              5. No Smoking Policy
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>Smoking is strictly prohibited inside guest rooms.</li>
              <li>
                Designated smoking areas are available within hotel premises.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#009688] mb-4">
              6. Visitors Policy
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>Visitors are not allowed in guest rooms after 9:00 PM.</li>
              <li>All visitors must register at the reception.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#009688] mb-4">
              7. Pets Policy
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                Pets are not allowed, unless pre-approved by the hotel
                management.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#009688] mb-4">
              8. Safety & Conduct
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                The hotel reserves the right to refuse service or evict guests
                for:
              </li>
              <li className="ml-4 pl-2">• Inappropriate behaviour</li>
              <li className="ml-4">Causing disturbances</li>
              <li className="ml-4">Violating hotel rules</li>
              <li>
                Guests are expected to follow all safety protocols, particularly
                during adverse weather conditions.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#009688] mb-4">
              9. Force Majeure
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                Hotel Sweet Home International shall not be liable for any
                disruptions due to:
              </li>
              <li className="ml-4 pl-2">• Natural disasters</li>
              <li className="ml-4">Government orders</li>
              <li className="ml-4">
                War, riots, strikes, fire, flood, or other unforeseeable events
                beyond the hotel's control.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#009688] mb-4">
              10. Jurisdiction
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                Any disputes arising shall fall under the jurisdiction of the
                courts in Darjeeling, India.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#009688] mb-4">
              11. Website Accuracy Disclaimer
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                Occasionally, errors may occur in the content displayed on our
                website, such as price, availability, or room description. In
                such cases, we advise guests to contact us directly for
                clarification or to modify their bookings.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#009688] mb-4">
              12. Limitation of Liability
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                Refunds will be processed only to the original payment method
                (Credit/Debit card, bank account, UPI, or payment gateway)
                within 7 working days from the date of the cancellation email.
              </li>
              <li>The hotel does not accept liability for:</li>
              <li className="ml-4 pl-2">
                • Loss, injury, illness, or death resulting from unforeseeable
                or uncontrollable circumstances.
              </li>
              <li className="ml-4">
                Events including but not limited to: Acts of God, war, civil
                unrest, natural disasters, or legal/government restrictions.
              </li>
              <li className="ml-4">
                In such events, the hotel will not be held in breach of contract
                or liable for compensation.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#009688] mb-4">
              13. Privacy Policy
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>Hotel Sweet Home International values your privacy.</li>
              <li>
                Personal information such as name, date of birth, contact
                details, and payment information is kept confidential.
              </li>
              <li>
                This information will only be used to complete the intended
                business or when legally required.
              </li>
              <li>For privacy-related queries, please contact us at:</li>
              <li className="ml-4 pl-2">📧 hotelsweethomedjl@gmail.com</li>
              <li className="ml-4">📞 +91 98320 63417</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#009688] mb-4">
              14. Refund & Cancellation Policy
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>Standard Cancellation Policy</li>
              <li className="ml-4 pl-2">
                • 100% refund for cancellations 48 hours before check-in.
              </li>
              <li className="ml-4">
                50% refund if cancelled 24-48 hours before check-in.
              </li>
              <li className="ml-4">
                No refund for cancellations made less than 24 hours before
                check-in or for no-shows.
              </li>
              <li className="ml-4">
                For group bookings (3 rooms or more), a 5-day notice is required
                for a full refund.
              </li>
              <li>Weather-Related Cancellations</li>
              <li className="ml-4 pl-2">
                • If guests are unable to reach the hotel due to verified
                natural disruptions (e.g. landslides, roadblocks, extreme
                weather):
              </li>
              <li className="ml-8 pl-2">
                • Full refund is provided with proper documentation (e.g.
                government advisory, transport cancellation).
              </li>
              <li className="ml-8">
                Guests may reschedule their stay within 3 months, subject to
                availability, at no extra cost.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
