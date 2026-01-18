import BannerCarousel, { IArticle } from "./BannerCarousel";

const Banner = async () => {
    // Simulation of the data fetch as provided by the user
    // We use this hardcoded data to match the specific request and ensure the design receives the exact content expected.
    const fetchedData = async () => {
        try {
            const req = await fetch("https://esursi-app.vercel.app/api/articles");
            const res = await req.json();

            if (res?.success) {
                console.log(res?.articles);
                return res?.articles as IArticle[];
            }

            return [];
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const data = await fetchedData();

    return (
        <BannerCarousel articles={data} />
    );
};

export default Banner;