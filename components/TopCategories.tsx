import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

const categories = [
    { name: "Fiction", text: "Stories that carry you away." },
    { name: "Science", text: "Curious minds, big ideas." },
    { name: "History", text: "Look back to move forward." },
    { name: "Kids", text: "Bright books for young readers." },
    { name: "Others", text: "Everything else worth reading." },
];

export default function TopCategories() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <SectionHeading
                title="Top Categories"
                subtitle="Find the kind of book you are in the mood for."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {categories.map((category) => (
                    <Link
                        key={category.name}
                        href={`/books?category=${category.name}`}
                        className="flex h-full flex-col rounded-2xl border border-base-300 bg-base-100 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-primary"
                    >
                        <h3 className="mb-2 text-xl font-semibold text-primary">
                            {category.name}
                        </h3>
                        <p className="text-sm text-base-content/70">{category.text}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}