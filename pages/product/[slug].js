import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export async function getStaticPaths() {
  // const url = new URL(process.env.URL || 'http://localhost:8888');
  // const url = new URL('http://localhost:8888');
  // url.pathname = '/api/products';

  // const res = await fetch(url.toString());

  // if (!res.ok) {
  //   console.error(res);
  //   return { props: {} };
  // }

  // const data = await res.json();

  return {
    // paths: data.products.edges.map(({ node }) => `/product/${node.handle}`),
    paths: ['/product/test'],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  // const url = new URL(process.env.URL || 'http://localhost:8888');
  // const url = new URL('http://localhost:8888');
  // url.pathname = '/api/products';

  // const res = await fetch(url.toString());

  // if (!res.ok) {
  //   console.error(res);
  //   return { props: {} };
  // }

  // const data = await res.json();

  // const product = data.products.edges
  //   .map(({ node }) => {
  //     if (node.totalInventory <= 0) {
  //       return false;
  //     }

  //     return {
  //       id: node.id,
  //       title: node.title,
  //       description: node.description,
  //       imageSrc: node.images.edges[0].node.src,
  //       imageAlt: node.title,
  //       price: node.variants.edges[0].node.priceV2.amount,
  //       slug: node.handle,
  //     };
  //   })
  //   .find(({ slug }) => slug === params.slug);

  return {
    props: {
      product: {
        id: 'a1',
        title: 'Test',
        description: 'Test',
        imageSrc:
          'https://cdn.shopify.com/s/files/1/0589/5798/8049/products/corgi-toy.jpg',
        imageAlt: 'test',
        price: '19.99',
        slug: 'test',
      },
    },
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
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          width={400}
          height={400}
        />
      </a>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className={styles.price}>{formattedPrice.format(product.price)}</p>
    </div>
  );
}

export default function ProductPage({ product }) {
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

        <Link href="/">&larr; back home</Link>

        <div className={styles.products}>
          <Product product={product} />
        </div>
      </main>
    </div>
  );
}
