import Layout from "../components/Layout";
import NextLink from 'next/link'
import "tailwindcss/tailwind.css";

export default function Home({pokemon}) {
  console.log(pokemon);
    return (
        <Layout title="NextJS Pokedex">
            <h1 className="text-4xl mb-8 text-center">NextJS Pokedex</h1>
            <ul>
              {
                pokemon.map((pokeman, index) => (
                  <li key={index}>
                    <NextLink href={`/pokemon?id=${index + 1}`}>
                      <a className='border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-200 rounded-lg'>
                        <img className='w-20 h-20 mr-3' src={pokeman.image} alt={pokeman.name}/>
                        <span className='mr-2 font-bold'>{index + 1}.</span>
                        {pokeman.name}
                      </a>
                    </NextLink>
                  </li>
                ))
              }
            </ul>
        </Layout>
    );
}

export async function getStaticProps(context) {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=999");
        const { results } = await res.json();
        const pokemon = results.map((res, index) => {
            const paddedIndex = ("00" + (index + 1)).slice(-3);
            const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
            return {
                ...res,
                image,
            };
        });
        return {
            props: { pokemon },
        };
    } catch (e) {
        console.log(e);
    }
}
