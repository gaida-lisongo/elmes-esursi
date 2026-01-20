import BlogData from "@/components/Blog/blogData";
import BlogItem from "@/components/Blog/BlogItem";
import Brands from "@/components/Brands";
import CTA from "@/components/CTA";
import Pricing from "@/components/Pricing";
import History from "@/components/History";
import { Metadata } from "next";
import Bibliographie from "@/components/Bibliographie";

export const metadata: Metadata = {
  title: "Ministère de l'ESURSI - RDC",
  description: "Découvrez l'histoire, les missions et les innovations du Ministère de l'Enseignement Supérieur, Universitaire et Recherche Scientifique Innovante."
};

const BlogPage = async () => {
  return (
    <main className="mt-10">
      <Bibliographie />
      <History />
      {/* <Brands /> */}
      <CTA />
      {/* <Pricing /> */}
      {/* <!-- ===== Blog Grid Start ===== --> */}
      {/* <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {BlogData.map((post, key) => (
              <BlogItem key={key} blog={post} />
            ))}
          </div>
        </div>
      </section> */}
      {/* <!-- ===== Blog Grid End ===== --> */}
    </main>
  );
};

export default BlogPage;
