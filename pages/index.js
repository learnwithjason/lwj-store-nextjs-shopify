import Head from 'next/head';
import styles from '../styles/Home.module.css';

export async function getStaticProps() {
  // const url = new URL(process.env.URL || 'http://localhost:8888');
  const url = new URL('http://localhost:8888');
  url.pathname = '/api/products';

  const res = await fetch(url.toString());

  if (!res.ok) {
    console.error(res);
    return { props: {} };
  }

  const data = await res.json();

  const products = data.products.edges
    .map(({ node }) => {
      if (node.totalInventory <= 0) {
        return false;
      }

      return {
        id: node.id,
        title: node.title,
        description: node.description,
        imageSrc: node.images.edges[0].node.src,
        imageAlt: node.title,
        price: node.variants.edges[0].node.priceV2.amount,
        slug: node.handle,
      };
    })
    .filter(Boolean);

  return {
    props: { products },
  };
}

function Product({ product }) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className={styles.product}>
      <a href={`/product/${product.slug}`}>
        <img src={product.imageSrc} alt={product.imageAlt} />
      </a>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className={styles.price}>{formattedPrice.format(product.price)}</p>
    </div>
  );
}

export default function Home({ products }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Learn With Jason Store (Please buy a duck)</title>
        <meta
          name="description"
          content="Jason has so many ducks. Please help."
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Store</h1>

        <div className={styles.products}>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
