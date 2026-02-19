import CategoryHeader from "./components/CategoryHeader";
import CategoryProducts from "./components/CategoryProducts";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div >
      <CategoryHeader slug={slug} />
      <CategoryProducts slug={slug} />
    </div>
  );
}
