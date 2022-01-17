import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";

import { Line } from "react-chartjs-2";

import {
  getStationData,
  getStationUrls,
  getChartData,
} from "../../lib/stations";

export async function getStaticProps({ params }) {
  const stationData = await getStationData(params.url);
  const chartData = getChartData();

  return {
    props: {
      stationData,
      chartData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getStationUrls();
  return {
    paths,
    fallback: false,
  };
}

export default function Station({ stationData, chartData }) {
  return (
    <Layout>
      <Head>
        <title>{stationData.stationName}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{stationData.stationName}</h1>
        <div className={utilStyles.lightText}>
          <p>{stationData.river}</p>
        </div>
        <div>
          <Line data={chartData} width={400} height={400} />
        </div>
      </article>
    </Layout>
  );
}
