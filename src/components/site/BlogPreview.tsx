import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import twominutes from "@/assets/blogs/twominutes.jpg";
import gumbleeding from "@/assets/blogs/gum-bleed.jpg";
import avoidsodas from "@/assets/blogs/avoid-sodas.jpg";
import every6months from "@/assets/blogs/every-6-months.jpg";
import floss from "@/assets/blogs/floss.jpg";
import firstvisit from "@/assets/blogs/first-visit.jpg";
const posts = [
  {
    title: "Brush for Two Minutes",
    summary:
      "Brushing for two minutes twice daily removes more plaque and helps prevent cavities and gum disease.",
    image: twominutes,
    link: "https://youtu.be/xm9c5HAUBpY?si=OvVqj6Gg4pFdscLn",
  },
  {
    title: "Bleeding Gums Aren't Normal",
    summary:
      "Bleeding gums may indicate early gum disease. Don't ignore the signs—visit your dentist promptly.",
    image: gumbleeding,
    link: "https://youtu.be/dSRv9p9Acls?si=X0nPcu5WhpZ6IpzA",
  },
  {
    title: "Limit Sugary & Acidic Drinks",
    summary:
      "Sugary and acidic drinks can weaken enamel and increase the risk of tooth decay over time.",
    image: avoidsodas,
    link: "https://youtu.be/9LgXnGjpImY?si=zIZFwe3ueFiM72Ud",
  },
  {
    title: "Visit Your Dentist Every 6 Months",
    summary:
      "Routine dental checkups help detect oral problems early before they become painful or expensive.",
    image: every6months,
    link: "https://youtu.be/MLzDzg70ej4?si=xhzy0jPMYTS-t5r9",
  },
  {
    title: "Don't Skip Flossing",
    summary:
      "Flossing removes food particles and plaque from areas that your toothbrush cannot reach.",
    image: floss,
    link: "https://youtu.be/HhdoPXNKNm4?si=yqZPRUErvZQQHcag",
  },
  {
    title: "Children's First Dental Visit",
    summary:
      "Children should visit a dentist by their first birthday or within six months of the first tooth erupting.",
    image: firstvisit,
    link: "https://youtu.be/XbAOx7EZ40s?si=sQfWy8tvv06RKYZl",
  },
];

export function BlogPreview() {
  const [showAll, setShowAll] = useState(false);

const visiblePosts = showAll ? posts : posts.slice(0, 3);
  return (
    <section id="blog" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Healthy Smile Tips
            </span>

            <h2 className="mt-3 font-display text-3xl font-bold text-heading sm:text-5xl">
              Dental <span className="text-gradient">Facts & Tips</span>
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              Learn simple habits and useful dental facts to help keep your smile healthy every day.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {visiblePosts.map((p) => (
            <article
  key={p.title}
  className="group overflow-hidden rounded-3xl bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
>
  <div className="relative h-48 overflow-hidden bg-muted">

    <img
      src={p.image}
      alt={p.title}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

  </div>

  <div className="p-6">

    <h3 className="font-display text-xl font-bold text-heading group-hover:text-primary">
      {p.title}
    </h3>

    <p className="mt-3 text-sm leading-6 text-muted-foreground">
      {p.summary}
    </p>

    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
    >
      Watch Video
      <ArrowRight className="h-4 w-4" />
    </a>

  </div>
</article>

          ))}
          <div className="mt-12 flex justify-center">

  <button
    onClick={() => setShowAll(!showAll)}
    className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-white"
  >
    {showAll ? (
      <>
        Show Less
        <ChevronUp className="h-5 w-5" />
      </>
    ) : (
      <>
        See More Tips
        <ChevronDown className="h-5 w-5" />
      </>
    )}
  </button>

</div>
        </div>
      </div>
    </section>
  );
}