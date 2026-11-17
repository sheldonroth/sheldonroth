import Image from 'next/image';

/**
 * Wide banner under the header, as on lik.com collection pages: full width on phones, inset 30px on desktop,
 * about 30% of the viewport width tall (431px at 1440, 700px at 2560).
 */
export default function CollectionBanner({ src, alt }: { src: string; alt: string }) {
  return (
    <section className="pt-[70px] lg:pt-[160px]">
      <div className="relative mt-[30px] h-[75vw] max-h-[700px] overflow-hidden sm:mx-5 sm:h-[40vw] lg:mx-[30px] lg:mt-0 lg:h-[30vw]">
        <Image quality={90} src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
      </div>
    </section>
  );
}
