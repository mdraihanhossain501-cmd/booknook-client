import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    number: "1",
    title: "Create an account",
    text: "Register in a minute and log in to unlock your own shelf.",
  },
  {
    number: "2",
    title: "Borrow a book",
    text: "Open any book, confirm the borrow and keep it for 7 days.",
  },
  {
    number: "3",
    title: "Return it",
    text: "Finished reading? Return the book from My Borrows so others can enjoy it.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-base-200 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title="How Borrowing Works"
          subtitle="Three simple steps from picking a book to returning it."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-content">
                {step.number}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-base-content/70">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}