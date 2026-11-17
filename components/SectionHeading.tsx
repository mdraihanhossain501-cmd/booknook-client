import FadeIn from "@/components/FadeIn";

type Props = {
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ title, subtitle }: Props) {
  return (
    <FadeIn className="mb-10 text-center">
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-base-content/70">
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}