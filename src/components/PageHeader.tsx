/** Collection-style page heading measured from lik.com: 46px/300 title, 18px/29px intro, centred. */
export default function PageHeader({ title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <header className="lk-container pb-10 pt-[110px] text-center lg:pb-14 lg:pt-[200px]">
      <h1 className="lk-page-title mx-auto max-w-4xl">{title}</h1>
      {intro && <p className="lk-intro mx-auto mt-6 max-w-[900px]">{intro}</p>}
    </header>
  );
}
