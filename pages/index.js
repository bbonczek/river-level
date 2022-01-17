import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getStations } from "../lib/stations";

export async function getStaticProps() {
  const stations = getStations();
  return {
    props: {
      stations,
    },
  };
}

export default function Home({ stations }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Select a hydrological station for which you want to see its current
          water level.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Stations</h2>
        <div className="grid">
          {stations.map(({ stationName, river, url }) => (
            <Link href={`/stations/${url}`} key={url} passHref>
              <div className="card">
                <h3>{stationName}</h3>
                <p>{river}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <style jsx>{`
        .grid {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          gap: 1rem;
        }

        .card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          cursor: pointer;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </Layout>
  );
}
